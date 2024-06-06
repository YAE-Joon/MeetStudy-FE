"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCertificates } from "../../redux/actions/certificationActions";
import { RootState } from "../../redux/reducers";
import Board from "@/component/Board";
import Pagination from "@/component/Pagination";
import { setCategories } from "@/redux/actions/categoryActions";

interface TabButtonProps {
  active: boolean;
}

interface TestIconProps {
  backgroundColor: string;
}

const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  padding: 1em 2em 0;
`;

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop: string) => prop !== "active",
})<TabButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 20px 20px 0 0;
  background: ${(props) => (props.active ? "#007bff" : "none")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  cursor: pointer;
  font-size: 16px;
  border-bottom: ${(props) => (props.active ? "2px solid #007bff" : "none")};
`;

const TabContent = styled.div`
  width: 100%;
`;

const SearchBar = styled.input`
  appearance: none;
  border-radius: 0.375rem;
  width: 20em;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  color: #000;
  ::placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const PostButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #007bff;
  border-bottom: 1px solid #007bff;
`;

const TableRow = styled.tr`
  cursor: pointer;
  th {
    cursor: default;
  }
  &:hover td {
    background-color: #f2f2f2;
  }
  &:last-child td {
    border-bottom: 0;
  }
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const TestIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<TestIconProps>`
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #fff;
  padding: 0 5px 0 3px;
  margin: 0 6px 0 10px;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

export default function CommunityPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("certificate");
  const postData = useSelector(
    (state: RootState) => state.certificates.certificates
  ); // Accessing data from Redux store
  const categoryData = useSelector(
    (state: RootState) => state.categories.categories
  ); // Accessing data from Redux store
  const [certificateSearchQuery, setCertificateSearchQuery] = useState("");
  const [certificate, setCertificate] = useState([
    {
      id: 1,
      content: "항공산업기사",
      company: "한국산업인력공단",
      test: "2024항공산업기사",
      register: "공시 예정",
      date: "공시 예정",
    },
    {
      id: 2,
      content: "전자캐드기능사",
      company: "한국산업인력공단",
      test: "2024전자캐드기능사",
      register: "공시 예정",
      date: "공시 예정",
    },
    {
      id: 3,
      content: "항공기체정비기능사",
      company: "한국산업인력공단",
      test: "2024항공기체정비기능사",
      register: "공시 예정",
      date: "공시 예정",
    },
  ]);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    return (router as any).query && (router as any).query.page
      ? parseInt((router as any).query.page as string, 10)
      : 1;
  });

  const itemsPerPage = 2;

  const popularPosts = [
    "짱 쉬운 자격증 SQLD",
    "더 쉬운 자격증 정보처리기사",
    "나처럼 해봐요 공인중개사",
  ];

  const popularinfoPosts = ["스터디 같이해요", "모각코", "강남역 9시"];

  useEffect(() => {
    if (activeTab === "certificate") {
      router.push(`/community/?page=${currentPage}`, undefined);
    } else {
      router.push(`/community`, undefined);
    }
  }, [currentPage, activeTab]);

  useEffect(() => {
    axios
      .get("http://34.47.79.59:8080/api/post/public?page=0&size=15")
      .then((response) => {
        dispatch(setCertificates(response.data)); // Redux 스토어에 데이터 설정
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [dispatch]);

  const token =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMCIsImF1dGgiOiJBRE1JTiIsInVzZXJuYW1lIjoi7J287J207IK87Jyg7KCAIiwiZXhwIjoyNzE3NjY0MDI2fQ.hrVSdMxokj0FbBXnmUKLlqgPwHvGMllGpeGmPw6pVdSFmybESvKhQbpZmpkuowbEc61rpYdkcPIi9m91C41StQ";

  useEffect(() => {
    axios
      .get("http://34.47.79.59:8080/api/post/public?page=0&size=15", {
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

  const handleCertificateSearch = () => {
    // 자격증 검색 로직을 구현합니다.
    // 검색 결과를 설정합니다.
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if (tab === "certificate" && currentPath !== "/community") {
      setCurrentPage(1);
      router.push(`/community/?page=1`, undefined);
    } else if (tab !== "certificate" && currentPath !== "/community") {
      router.push(`/community`, undefined);
    }
  };

  const renderCertificatePosts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return certificate.slice(startIndex, endIndex).map((post) => (
      <TableRow key={post.id}>
        <TableCell>
          <div className="flex flex-col">
            <div className="flex">
              <h2>{post.content}</h2>
              <span className="font-light">{post.company}</span>
            </div>
            <div>
              <ul className="flex gap-3 text-sm">
                <li>
                  <p>
                    시험명<em className="not-italic mx-1">|</em>
                    {post.test}
                  </p>
                </li>
                <li>
                  <p>
                    접수일<em className="not-italic mx-1">|</em>
                    {post.register}
                  </p>
                </li>
                <li>
                  <p>
                    시험일<em className="not-italic mx-1">|</em>
                    {post.date}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "certificate":
        return (
          <CertificateBoard>
            <div className="flex flex-col gap-3 bg-[#f7f7f7] px-10 py-10">
              <h2 className="font-semibold">자격증 정보 검색</h2>
              <div className="flex mb-2 gap-2">
                <SearchBar
                  placeholder="찾고 싶은 자격증명을 입력해주세요."
                  value={certificateSearchQuery}
                  onChange={(e) => setCertificateSearchQuery(e.target.value)}
                />
                <PostButton onClick={handleCertificateSearch}>
                  <LuSearch />
                </PostButton>
              </div>
            </div>

            <div className="px-10 py-10">
              <div className="flex justify-between pb-3">
                <div>
                  <span className="font-semibold text-[#292929]">
                    검색 결과<em className="text-[#52C233]">5,860 건</em>
                  </span>
                </div>
                <div className="flex">
                  <p>
                    <TestIcon backgroundColor="#ff7a00">시</TestIcon>
                    시험일
                  </p>
                  <p>
                    <TestIcon backgroundColor="#0414ab">접</TestIcon>
                    접수중
                  </p>
                  <p>
                    <TestIcon backgroundColor="#0f6117">예</TestIcon>
                    접수예정
                  </p>
                  <p>
                    <TestIcon backgroundColor="#ab0404">마</TestIcon>
                    오늘접수마감
                  </p>
                </div>
              </div>

              <Table>
                <tbody>{renderCertificatePosts()}</tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(certificate.length / itemsPerPage)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </CertificateBoard>
        );
      case "certificateInfo":
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
      case "info":
        return (
          <InfoBoard>
            <Board
              title="정보공유 게시판"
              posts={postData}
              popularPosts={popularinfoPosts}
              categories={categoryData}
            />
          </InfoBoard>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TabBar>
        <TabButton
          active={activeTab === "certificate"}
          onClick={() => handleTabSwitch("certificate")}
        >
          자격증 게시판
        </TabButton>
        <TabButton
          active={activeTab === "certificateInfo"}
          onClick={() => handleTabSwitch("certificateInfo")}
        >
          자격증 정보공유 게시판
        </TabButton>
        <TabButton
          active={activeTab === "info"}
          onClick={() => handleTabSwitch("info")}
        >
          정보공유 게시판
        </TabButton>
      </TabBar>
      <TabContent>{renderTabContent()}</TabContent>
    </div>
  );
}

function CertificateBoard(props: { children: React.ReactNode }) {
  return <div>{props.children}</div>;
}

function CertificateInfoBoard(props: { children: React.ReactNode }) {
  return <div>{props.children}</div>;
}

function InfoBoard(props: { children: React.ReactNode }) {
  return <div>{props.children}</div>;
}
