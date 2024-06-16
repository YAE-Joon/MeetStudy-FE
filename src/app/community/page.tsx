"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCertificates } from "../../redux/actions/certificationActions";
import { RootState } from "../../redux/reducers";
import Board from "@/component/Board";
import { setCategories } from "@/redux/actions/categoryActions";
import { TabBar, TabButton, TabContent } from "./CommunityPageStyles"; // Import styles
import getTokenByClient from "@/util/getTokenByClient";

export default function CommunityPage() {
  const dispatch = useDispatch();
  const postData = useSelector(
    (state: RootState) => state.certificates.certificates
  ); // Accessing data from Redux store
  const categoryData = useSelector(
    (state: RootState) => state.categories.categories
  ); // Accessing data from Redux store

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    axios
      .get(`${baseUrl}/api/post/public?page=0&size=100`)
      .then((response) => {
        dispatch(setCertificates(response.data)); // Redux 스토어에 데이터 설정
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [dispatch]);

  useEffect(() => {
    const token = getTokenByClient();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    axios
      .get(`${baseUrl}/api/admin/categories/public`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
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
