import React, { useState } from "react";
import Pagination from "@/component/Pagination"; // Pagination 컴포넌트의 경로에 맞게 수정하세요.
import Link from "next/link";

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

  // 현재 페이지에 따라 검색된 결과를 포함한 게시글 목록을 반환하는 함수
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 검색어 입력 시 상태를 업데이트하는 함수
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // 검색어가 변경되면 첫 번째 페이지로 초기화
  };

  const handleNewPostClick = () => {
    // 새로운 게시글 작성 기능을 수행하는 코드를 추가합니다.
    // 예를 들어, 새로운 게시글 작성 페이지로 이동하는 등의 동작을 수행할 수 있습니다.
    console.log("새로운 게시글 작성 버튼이 클릭되었습니다.");
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
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-950 rounded-lg shadow p-4"
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
            totalPages={Math.ceil(posts.length / itemsPerPage)}
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
                <a key={index} href="#" className="text-sm hover:underline">
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
