import { PayloadAction } from "@reduxjs/toolkit";
import { PostBoard } from "@/types/PostBoard"; // 타입 정의가 필요한 경우

export const SET_CERTIFICATES = "SET_CERTIFICATES";

export type SetCertificatesAction = PayloadAction<
  PostBoard[],
  typeof SET_CERTIFICATES
>;

export const setCertificates = (
  certificates: PostBoard[]
): SetCertificatesAction => ({
  type: SET_CERTIFICATES,
  payload: certificates,
});
