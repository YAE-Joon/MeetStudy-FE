"use client";

import { RootState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Comment {
  ninkname: string;
  postId: number;
  content: string;
  createdAt: string;
}

export default function PostDetail() {
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(true);

  const postData = useSelector((state: RootState) =>
    state.certificates.certificates.filter(
      (post) => post.id === parseInt(postId)
    )
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://34.47.79.59:8080/api/comment/public/${postId}?page=0&size=8`
        );
        const data: Comment[] = await response.json();
        console.log("Fetched data:", data); // 데이터를 콘솔에 출력
        setComments(data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (postData.length === 0) {
    return <div>Loading...</div>;
  }

  const post = postData[0];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <div>{post.nickname}</div>
            <div>|</div>
            <div>{post.createdAt}</div>
            <div>|</div>
            <div>{post.hit}</div>
          </div>
        </div>
        <div className="prose prose-gray dark:prose-invert">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {/* <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Avatar className="w-10 h-10">
                <img src="/placeholder.svg" alt="Jane Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">Jane Doe</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  May 16, 2023
                </div>
              </div>
              <p className="mt-2">
                This new product line looks amazing! I can\'t wait to try it
                out.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Avatar className="w-10 h-10">
                <img src="/placeholder.svg" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">John Smith</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  May 17, 2023
                </div>
              </div>
              <p className="mt-2">
                I\'m really impressed with the attention to detail in this new
                product line. Can\'t wait to see what else you have in store!
              </p>
            </div>
          </div>
        </div> */}
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {/* Uncomment and replace with actual avatar */}
                {/* <Avatar className="w-10 h-10">
                    <img src="/placeholder.svg" alt={comment.ninkname} />
                    <AvatarFallback>{comment.ninkname[0]}</AvatarFallback>
                  </Avatar> */}
              </div>
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
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Leave a Comment</h3>
          <form className="grid gap-4">
            {/* <Textarea placeholder="Write your comment..." className="p-4" />
            <Button type="submit">Submit</Button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
