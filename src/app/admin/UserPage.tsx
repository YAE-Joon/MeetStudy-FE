"use client";
// 개별 스터디룸의 멤버 리스트
import { useState } from "react";

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
  const [currPage, setCurrPage] = useState(0);
  const tableHeadList = [
    "No(id)",
    "역할",
    "이름",
    "이메일",
    "닉네임",
    "관심분야",
  ];

  const [AllUserData, error] = useFetch<AdminUserData[]>(
    apiPaths.admin.users,
    {},
    true
  );
  console.log("AllUserData", AllUserData);

  // quit user
  const handleRemove = async (userId: number) => {
    if (confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      try {
        const response = await fetchDataBE(
          apiPaths.admin.quitUser(userId),
          {
            method: "DELETE",
          },
          true,
          false
        );
        alert("회원 강퇴 완료!");
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
      <OuterContainer>
        <Container>
          <Header>
            <Title $color={tokens.colors.simple.blackbasic}>회원 관리</Title>
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
        </Container>
      </OuterContainer>
    </>
  );
};

export default UserPage;
