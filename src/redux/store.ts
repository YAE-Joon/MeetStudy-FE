import { combineReducers, configureStore } from "@reduxjs/toolkit";
import certificateReducer from "./reducers/certificateReducer";
import categoryReducer from "./reducers/categoryReducer";

// 루트 리듀서 정의
const rootReducer = combineReducers({
  certificates: certificateReducer,
  categories: categoryReducer,
});

// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;

// 스토어 생성
const store = configureStore({
  reducer: rootReducer,
  // 여기서 middleware 및 기타 구성을 추가할 수 있습니다.
});

export default store;
