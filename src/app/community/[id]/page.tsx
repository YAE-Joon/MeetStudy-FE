"use client";

import React, { useEffect, useState, FormEvent } from "react";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { keyframes, styled } from "styled-components";

interface Post {
  id: number;
  title: string;
  nickname: string;
  createdAt: string;
  hit: number;
  content: string;
}

interface Comment {
  ninkname: string;
  postId: number;
  content: string;
  createdAt: string;
}

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const postId = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : parseInt(params.id); // 문자열을 숫자로 변환

  useEffect(() => {
    fetchPost(postId);
    fetchComments(postId);
  }, [postId]);

  const fetchPost = async (postId: number) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await fetch(`${baseUrl}/api/post/public/${postId}`);
      const postData: Post = await response.json();
      setPost(postData);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await fetch(
        `${baseUrl}/api/comment/public/${postId}?page=0&size=8`
      );
      const data: Comment[] = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = Cookies.get("accessToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await fetch(`${baseUrl}/api/comment/${post?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const newCommentData: Comment = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment("");
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading || !post) {
    return (
      <LoadingScreen>
        <Spinner />
        <p>Loading...</p>
      </LoadingScreen>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 h-screen">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <div>{post.nickname}</div>
            <div>|</div>
            <div>{post.createdAt}</div>
            <div>|</div>
            <div>{post.hit} views</div>
          </div>
        </div>
        <div className="prose prose-gray dark:prose-invert">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{comment.ninkname}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {comment.createdAt}
                    </div>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
              댓글이 없습니다.
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Leave a Comment</h3>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 p-4"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#007bff] text-[#fff] hover:bg-[#007bff]/90 h-10 px-4 py-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: ${spin} 1s linear infinite;
`;
