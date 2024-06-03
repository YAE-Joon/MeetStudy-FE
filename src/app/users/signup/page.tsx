"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchWithCommonHeaders } from "@/lib/fetchWithCommonHeaders";

const interestsOptions = [
  "이름1",
  "이름2",
  "이름3",
  "이름4",
  "이름5",
  "이름6",
  "이름7",
  "이름8",
];

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
  const [status, setStatus] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setStatus("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetchWithCommonHeaders("/api/signup", {
        method: "POST",
        body: JSON.stringify({ ...form, email: initialEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입에 실패했습니다.");
      }

      setStatus("회원가입에 성공했습니다.");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setStatus("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-center mt-[5rem] px-6 lg:px-8 h-[90vh]">
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
              {interestsOptions.map((interest, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`interest-${index}`}
                    name="interests"
                    value={interest}
                    checked={form.interests.includes(interest)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`interest-${index}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="text-white mt-[20px] flex gap-2 bg-[#52C233] hover:bg-[#5abe3e]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            회원가입
          </button>
        </form>
        {status && (
          <p className="mt-4 text-center text-sm text-red-500">{status}</p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
