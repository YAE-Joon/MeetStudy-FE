import { createReducer } from "@reduxjs/toolkit";
import {
  SET_CERTIFICATES,
  SetCertificatesAction,
} from "../actions/certificationActions";

interface CertificateState {
  certificates: Certificate[];
}

const initialState: CertificateState = {
  certificates: [],
};

const certificateReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_CERTIFICATES, (state, action: SetCertificatesAction) => {
    state.certificates = action.payload;
  });
});

export default certificateReducer;
// 타입을 재사용하기 위해 Certificate 타입을 임포트합니다.
import { Certificate } from "@/types/Certificate";
