"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Category {
  id: number;
  name: string;
  description: string;
}

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // 카테고리 목록 가져오기
    const fetchCategories = async () => {
      const token = Cookies.get("accessToken"); // 쿠키에서 토큰 가져오기

      if (!token) {
        console.error("토큰을 찾을 수 없습니다");
        return;
      }
      try {
        const response = await axios.get(
          "http://34.47.79.59:8080/api/admin/categories/public",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리 목록 가져오기 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = Cookies.get("accessToken");

    if (!token) {
      console.error("토큰을 찾을 수 없습니다");
      return;
    }

    try {
      await axios.post(
        "http://34.47.79.59:8080/api/post",
        {
          categoryId: parseInt(category), // category 값을 숫자로 변환하여 categoryId로 사용
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 성공 시 게시글 목록 페이지로 이동
      window.location.href = "/community"; // 게시글 목록 페이지 경로로 수정하세요.
    } catch (error) {
      console.error("게시글 작성 중 오류 발생:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Write a new post</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-950 rounded-lg shadow p-6 space-y-4 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-2xl font-bold"
              required
            />
            <textarea
              placeholder="Write your post content here..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[400px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 hover:bg-blue-600 text-white h-10 px-4 py-2"
            >
              Publish
            </button>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Post Settings
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full flex items-center justify-between"
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
