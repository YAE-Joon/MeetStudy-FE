import { Post } from "@/types/Post"; // 타입 정의가 필요한 경우

export const SET_POSTS = "SET_POSTS";

export interface SetPostsAction {
  type: typeof SET_POSTS;
  payload: Post[];
}
export const setPosts = (posts: Post[]): SetPostsAction => ({
  type: SET_POSTS,
  payload: posts,
});
