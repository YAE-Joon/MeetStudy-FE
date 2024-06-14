"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface SignupForm {
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  interests: string[];
}

const SignupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [form, setForm] = useState<SignupForm>({
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    interests: [],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://34.47.79.59:8080/api/admin/categories/public"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prevForm) => {
      let interests = prevForm.interests;
      if (type === "checkbox") {
        interests = checked
          ? [...prevForm.interests, value]
          : prevForm.interests.filter((interest) => interest !== value);
      } else {
        return { ...prevForm, [name]: value };
      }

      return { ...prevForm, interests };
    });
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/", // 로그인 후 이동할 페이지
      });

      if (result?.error) {
        console.error("로그인에 실패했습니다.", result.error);
        return false;
      }

      console.log("로그인에 성공했습니다.");
      return true;
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다.", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setStatus("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const formattedInterests = form.interests
        .map((interest) => {
          const category = categories.find(
            (category) => category.name === interest
          );
          return category ? category.id : null;
        })
        .filter((id) => id !== null);

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await fetch(`${baseUrl}/api/user/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: initialEmail,
          password: form.password,
          username: form.name,
          nickname: form.nickname,
          interests: formattedInterests,
        }),
      });

      console.log(formattedInterests);

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "회원가입에 실패했습니다.");
      }

      // 회원가입 후 로그인 상태로 변경
      const signInSuccess = await handleSignIn(initialEmail, form.password);
      if (signInSuccess) {
        setStatus("회원가입 및 로그인에 성공했습니다.");
        router.push("/");
      } else {
        setStatus("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      setStatus("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-center m-[5rem] px-6 lg:px-8 h-screen">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-gray-600">
          회원가입
        </h1>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={initialEmail}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이메일 주소를 입력하세요"
              required
              readOnly
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="nickname"
              className="text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">
              관심분야
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`interest-${category.id}`}
                    name="interests"
                    value={category.name}
                    checked={form.interests.includes(category.name)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`interest-${category.id}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="text-white mt-[20px] flex gap-2 bg-[#52C233] hover:bg-[#5abe3e]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center"
          >
            회원가입
          </button>
          {status && <p className="text-center text-red-500 mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
