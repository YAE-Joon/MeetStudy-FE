import { createReducer } from "@reduxjs/toolkit";
import { SET_CATEGORIES, SetCategoryAction } from "../actions/categoryActions";

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_CATEGORIES, (state, action: SetCategoryAction) => {
    state.categories = action.payload;
  });
});

export default categoryReducer;
// 타입을 재사용하기 위해 Certificate 타입을 임포트합니다.
import { Category } from "@/types/Category";
