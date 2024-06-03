import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/types/Post"; // Post 타입 임포트
import { RootState } from "../store"; // RootState 타입 임포트

// 초기 상태 정의
interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

// slice 생성
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { setPosts } = postSlice.actions;

// 리듀서 내보내기
export default postSlice.reducer;
