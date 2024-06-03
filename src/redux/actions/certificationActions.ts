import { PayloadAction } from "@reduxjs/toolkit";
import { Certificate } from "@/types/Certificate"; // 타입 정의가 필요한 경우

export const SET_CERTIFICATES = "SET_CERTIFICATES";

export type SetCertificatesAction = PayloadAction<
  Certificate[],
  typeof SET_CERTIFICATES
>;

export const setCertificates = (
  certificates: Certificate[]
): SetCertificatesAction => ({
  type: SET_CERTIFICATES,
  payload: certificates,
});
