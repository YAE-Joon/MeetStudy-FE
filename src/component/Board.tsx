import React, { useState, useEffect } from "react";
import Pagination from "@/component/Pagination"; // Pagination 컴포넌트의 경로에 맞게 수정하세요.
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

interface Post {
  id: number;
  category: string;
  nickname: string;
  title: string;
  content: string;
  hit: number;
  createdAt: string;
}

interface Categories {
  id: number;
  name: string;
  description: string;
}

interface Props {
  title: string;
  posts: Post[];
  popularPosts: string[];
  categories: Categories[];
}

const Board: React.FC<Props> = ({ title, posts, popularPosts, categories }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 추적하는 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어를 추적하는 상태
  const itemsPerPage = 5;
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);

  useEffect(() => {
    setCurrentPage(1); // 검색어나 카테고리 변경 시 페이지를 첫 번째 페이지로 초기화
  }, [searchQuery, categoryPosts]);

  // 클릭한 게시글의 조회수를 증가시키고 상세 페이지로 이동하는 함수
  const handlePostClick = async (postId: number) => {
    const token = Cookies.get("accessToken"); // 쿠키에서 토큰 가져오기

    if (!token) {
      console.error("토큰을 찾을 수 없습니다");
      return;
    }

    try {
      // 게시글 조회수 증가
      await axios.get(`http://34.47.79.59:8080/api/post/public/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 상세 페이지로 이동
      window.location.href = `/community/${postId}`;
    } catch (error) {
      console.error("게시글 조회수 업데이트 중 오류 발생:", error);
    }
  };

  // 카테고리를 클릭했을 때 해당 카테고리에 속하는 게시물을 가져오는 함수
  const handleCategoryClick = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `http://34.47.79.59:8080/api/post/public/category/${categoryId}?page=0&size=15`
      );
      const data: Post[] = response.data; // 카테고리에 속하는 게시물 데이터 가져오기

      setCategoryPosts(data); // 가져온 데이터로 게시물 목록 업데이트
    } catch (error) {
      console.error("카테고리별 게시물 가져오는 중 오류 발생:", error);
    }
  };

  // 현재 페이지에 따라 검색된 결과를 포함한 게시글 목록을 반환하는 함수
  const filteredPosts = categoryPosts.length ? categoryPosts : posts;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // 검색어 입력 시 상태 업데이트 함수
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // 새로운 게시글 작성 클릭 시 동작 함수
  const handleNewPostClick = () => {
    console.log("새로운 게시글 작성 버튼이 클릭되었습니다.");
    // 여기에 새로운 게시글 작성 페이지로 이동하는 코드를 추가할 수 있습니다.
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-gray-100 dark:bg-gray-900 py-5 px-10">
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>
      <div className="flex-1 grid grid-cols-[3fr_1fr] gap-6 p-6">
        <div className="space-y-4">
          <div className="w-full ">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 17l5-5m0 0l-5-5m5 5h-12"
                />
              </svg>
              <div className="w-full flex">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요."
                  className="mr-5 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 w-full py-2"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button
                  className="w-[10em] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNewPostClick}
                >
                  게시글 작성
                </button>
              </div>
            </div>
          </div>
          {currentPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-950 rounded-lg shadow p-4"
              onClick={() => handlePostClick(post.id)} // 클릭 시 handlePostClick 함수 호출
            >
              <Link href={`/community/${post.id}`}>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="font-medium text-lg">{post.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.nickname}</span>
                    <span className="mx-2">·</span>
                    <span>{post.createdAt}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    조회수 {post.hit}
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-2">인기 게시글</h2>
            <div className="space-y-2">
              {popularPosts.map((popularPost, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium">{index + 1}.</span>
                  <a href="#" className="text-sm hover:underline">
                    {popularPost}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-2">카테고리</h2>
            <div className="space-y-2 flex flex-col">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm hover:underline"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
