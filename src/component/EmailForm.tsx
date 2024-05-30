"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { sendContactEmail } from "../app/api/contact";

const initialContact = {
  from: "",
  title: "",
  content: "",
};

export default function EmailForm() {
  const [contact, setContact] = useState(initialContact);
  const [file, setFile] = useState<string | undefined>();
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].type) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          let base64Sub = base64.toString();
          setFile(base64Sub);
        }
      };
    } else {
      alert("파일 형식이 올바르지 않습니다.");
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail({ ...contact, file });
    setContact(initialContact);
    setFile(undefined);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <label className="flex gap-4 items-center justify-between font-bold">
        제목
        <input
          required
          type="text"
          name="title"
          className="basis-3/4 p-2 font-normal border-2"
          value={contact.title}
          onChange={onChange}
        />
      </label>
      <label className="flex gap-4 items-center justify-between font-bold">
        문의 내용
        <textarea
          required
          name="content"
          rows={8}
          className="basis-3/4 p-2 font-normal border-2"
          value={contact.content}
          onChange={onChange}
        />
      </label>
      <label className="flex gap-4 items-center justify-between font-bold">
        이메일
        <input
          required
          type="text"
          name="from"
          className="basis-3/4 p-2 font-normal border-2"
          value={contact.from}
          onChange={onChange}
        />
      </label>
      <label className="flex gap-4 items-center justify-between font-bold">
        첨부 파일
        <div className="basis-3/4 ml-4 font-normal">
          <div className="flex items-center h-[70px]">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onSelectFile}
            />
            {file && (
              <Image src={file} alt="local file" width="70" height="70" />
            )}
          </div>
        </div>
      </label>

      <button className="p-4 bg-[#28BAB5] text-white text-lg">작성 완료</button>
    </form>
  );
}
