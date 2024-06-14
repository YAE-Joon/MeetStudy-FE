"use client";
// 개별 스터디룸의 멤버 리스트
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import fetchDataBE from "@/lib/fetch";

import { AdminUserData } from "@/types/Admin";

import dt from "@/lib/designToken/designTokens";

import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { OuterContainer } from "@/component/styled-components/Container";
import StyledAdminUserPage from "@/app/admin/UserStyled";
import { Title } from "@/component/styled-components/TextBoxes";

import Loading from "@/component/Loading/Loading";
import { Container } from "@/component/styled-components/Container";
import getTokenByClient from "@/util/getTokenByClient";

import { getUserFromToken } from "@/util/getUserFromToken";

const tokens = dt.DesignTokenVarNames;
const {
  Header,
  TableWrapper,
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableHead,
  StyledTableBody,
  StyledTableCell,
  Button,
  QuitButton,
} = StyledAdminUserPage;
const UserPage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const router = useRouter();
  const tableHeadList = [
    "No(id)",
    "역할",
    "이름",
    "이메일",
    "닉네임",
    "관심분야",
  ];

  useEffect(() => {
    const token = getTokenByClient();
    const userInfo = getUserFromToken(token);
    if (userInfo && userInfo?.auth !== "ADMIN") {
      setIsRedirecting(true);
      alert("[⚠] 관리자가 아닙니다. 메인화면으로 이동합니다. ");
      router.push("/");
    }
  }, []);

  const [AllUserData, error, loading, setUserData] = useFetch<AdminUserData[]>(
    apiPaths.admin.users,
    {}
  );

  if (error && error.status === 403) {
    const router = useRouter();
    alert("[⚠] 관리자가 아닙니다. 메인화면으로 이동합니다.");
    router.push("/");
  }

  // quit user
  const handleRemove = async (userId: number) => {
    const token = getTokenByClient();

    if (confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      try {
        const response = await fetchDataBE(
          apiPaths.admin.quitUser(userId),
          {
            method: "DELETE",
          },
          token
        );
        alert("회원 강퇴 완료!");
        const reaminUserData =
          AllUserData?.filter((userData) => userData.id !== userId) || [];
        setUserData(reaminUserData);
        return response;
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생", error);
        alert("회원 탈퇴 중 오류 발생!");
        throw error;
      }
    }
  };

  //pagination

  const usersPerPage = 10;
  const totalPages = AllUserData
    ? Math.ceil(AllUserData.length / usersPerPage)
    : 0;
  const handlePrevPage = () => {
    setCurrPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  const handleNextPage = () => {
    setCurrPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };
  const currentUserData = AllUserData
    ? AllUserData.slice(currPage * usersPerPage, (currPage + 1) * usersPerPage)
    : [];

  return !AllUserData ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <OuterContainer $minWidth={"100%"}>
        <Container>
          {!isRedirecting && (
            <>
              <Header>
                <Title $color={tokens.colors.simple.blackbasic}>
                  회원 관리
                </Title>
              </Header>
              {AllUserData === null || AllUserData.length === 0 ? (
                <>
                  <div>유저가 존재하지 않습니다.</div>
                </>
              ) : (
                <>
                  <TableWrapper>
                    <StyledTable>
                      <StyledTableHeader>
                        <StyledTableRow>
                          {tableHeadList.map((head, idx) => (
                            <StyledTableHead key={idx}>{head}</StyledTableHead>
                          ))}
                        </StyledTableRow>
                      </StyledTableHeader>
                      <StyledTableBody>
                        {currentUserData.map((user) => (
                          <StyledTableRow key={user.id}>
                            <StyledTableCell>{user.id}</StyledTableCell>
                            <StyledTableCell>{user.role}</StyledTableCell>
                            <StyledTableCell>{user.username}</StyledTableCell>
                            <StyledTableCell>{user.email}</StyledTableCell>
                            <StyledTableCell>{user.nickname}</StyledTableCell>
                            <StyledTableCell>{user.interests}</StyledTableCell>
                            <StyledTableCell>
                              <QuitButton onClick={() => handleRemove(user.id)}>
                                삭제
                              </QuitButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </StyledTableBody>
                    </StyledTable>
                  </TableWrapper>
                  <div>
                    <Button onClick={handlePrevPage} disabled={currPage === 0}>
                      이전
                    </Button>
                    <Button
                      onClick={handleNextPage}
                      disabled={currPage === totalPages - 1}
                    >
                      다음
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </OuterContainer>
    </>
  );
};

export default UserPage;
