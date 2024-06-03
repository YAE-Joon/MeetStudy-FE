"use client";

import Navbar from "@/component/Navbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../redux/store"; // Redux store를 가져옵니다.

import StyledComponentsRegistry from "@/lib/styled-components/registry";

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <>
      <SessionProvider>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>

        <ToastContainer
          autoClose={1000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </SessionProvider>
    </>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <div className="layout">
        <Navbar />
        {children}
      </div>
    </Provider>
  );
};
