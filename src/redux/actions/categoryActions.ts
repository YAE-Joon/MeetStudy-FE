import { PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types/Category"; // 타입 정의가 필요한 경우

export const SET_CATEGORIES = "SET_CATEGORIES";

export type SetCategoryAction = PayloadAction<
  Category[],
  typeof SET_CATEGORIES
>;

export const setCategories = (categories: Category[]): SetCategoryAction => ({
  type: SET_CATEGORIES,
  payload: categories,
});
