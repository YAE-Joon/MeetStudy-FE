// not use
"use client";
import { useState } from "react";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import fetchDataBE from "@/lib/fetch";
import dt from "@/lib/designToken/designTokens";

import StyledAdminUserPage from "@/app/admin/UserStyled";
import { OuterContainer } from "@/component/styled-components/Container";
import { Title } from "@/component/styled-components/TextBoxes";
import Loading from "@/component/Loading/Loading";
import { Container } from "@/component/styled-components/Container";
import { StudyRoom } from "@/types/StudyRoom";
import getTokenByClient from "@/util/getTokenByClient";

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

const AdminCategories = () => {
  const [currPage, setCurrPage] = useState(0);
  const tableHeadList = ["No(id)", "이름", "생성일시", "최대인원"];

  const [AllStudyRooms, error] = useFetch<StudyRoom[]>(
    apiPaths.admin.getAllstudyRooms,
    {}
  );

  const handleRemove = async (userId: number) => {
    if (confirm("정말로 이 카테고리를 삭제하시겠습니까?")) {
      try {
        const token = getTokenByClient();
        const response = await fetchDataBE(
          apiPaths.admin.rmStudyRoom(userId),
          {
            method: "DELETE",
          },
          token
        );
        alert("카테고리 삭제 완료!");
        return response;
      } catch (error) {
        console.error("카테고리를 삭제 중 오류 발생", error);
        alert("카테고리 삭제 중 오류 발생!");
        throw error;
      }
    }
  };

  const roomsPerPage = 5;
  const totalPages = AllStudyRooms
    ? Math.ceil(AllStudyRooms.length / roomsPerPage)
    : 0;
  const handlePrevPage = () => {
    setCurrPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  const handleNextPage = () => {
    setCurrPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };
  const currentStudyRoom = AllStudyRooms
    ? AllStudyRooms.slice(
        currPage * roomsPerPage,
        (currPage + 1) * roomsPerPage
      )
    : [];

  return !AllStudyRooms ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <OuterContainer>
        <Container>
          <Header>
            <Title $color={tokens.colors.simple.blackbasic}>
              카테고리를 리스트
            </Title>
          </Header>
          {AllStudyRooms === null || AllStudyRooms.length === 0 ? (
            <>
              <div>카테고리를이 존재하지 않습니다.</div>
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
                    {currentStudyRoom.map((room) => (
                      <StyledTableRow key={room.id}>
                        <StyledTableCell>{room.id}</StyledTableCell>
                        <StyledTableCell>{room.title}</StyledTableCell>
                        <StyledTableCell>{room.createdDate}</StyledTableCell>
                        <StyledTableCell>{room.userCapacity}</StyledTableCell>
                        <StyledTableCell>
                          {/* <QuitButton onClick={() => handleRemove(room.id)}>
                            삭제
                          </QuitButton> */}
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

export default AdminCategories;
