"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCertificates } from "../../redux/actions/certificationActions";
import { RootState } from "../../redux/reducers";
import Board from "@/component/Board";
import { setCategories } from "@/redux/actions/categoryActions";
import { TabBar, TabButton, TabContent } from "./CommunityPageStyles"; // Import styles

export default function CommunityPage() {
  const dispatch = useDispatch();
  const postData = useSelector(
    (state: RootState) => state.certificates.certificates
  ); // Accessing data from Redux store
  const categoryData = useSelector(
    (state: RootState) => state.categories.categories
  ); // Accessing data from Redux store

  const popularPosts = [
    "짱 쉬운 자격증 SQLD",
    "더 쉬운 자격증 정보처리기사",
    "나처럼 해봐요 공인중개사",
  ];

  useEffect(() => {
    axios
      .get("http://34.47.79.59:8080/api/post/public?page=0&size=100")
      .then((response) => {
        dispatch(setCertificates(response.data)); // Redux 스토어에 데이터 설정
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [dispatch]);

  const token =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMCIsImF1dGgiOiJBRE1JTiIsInVzZXJuYW1lIjoi7J287J207IK87Jyg7KCAIiwiZXhwIjoyNzE3NjY0MDI2fQ.hrVSdMxokj0FbBXnmUKLlqgPwHvGMllGpeGmPw6pVdSFmybESvKhQbpZmpkuowbEc61rpYdkcPIi9m91C41StQ";

  useEffect(() => {
    axios
      .get("http://34.47.79.59:8080/api/admin/categories/public", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("Fetched data:", response.data); // 데이터를 콘솔에 출력
        dispatch(setCategories(response.data)); // Redux 스토어에 데이터 설정
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [dispatch]);

  const renderTabContent = () => {
    return (
      <CertificateInfoBoard>
        <Board
          title="자격증 정보공유 게시판"
          posts={postData}
          popularPosts={popularPosts}
          categories={categoryData}
        />
      </CertificateInfoBoard>
    );
  };

  return (
    <div>
      <TabBar>
        <TabButton>정보공유 게시판</TabButton>
      </TabBar>
      <TabContent>{renderTabContent()}</TabContent>
    </div>
  );
}

function CertificateInfoBoard(props: { children: React.ReactNode }) {
  return <div>{props.children}</div>;
}
