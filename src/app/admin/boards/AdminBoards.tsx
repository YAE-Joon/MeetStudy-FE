"use client";
import { useState } from "react";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import fetchDataBE from "@/lib/fetch";

import { PostBoard } from "@/types/PostBoard";
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

const AdminBoards = () => {
  const [currPage, setCurrPage] = useState(0);
  const tableHeadList = [
    "No(id)",
    "카테고리",
    "글 제목",
    "작성자",
    "생성일",
    "조회수",
  ];

  const [AllBoardPosts, error, loading, setBoardData] = useFetch<PostBoard[]>(
    apiPaths.admin.posts,
    {}
  );

  const handleRemove = async (postId: number) => {
    const token = getTokenByClient();
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        const response = await fetchDataBE(
          apiPaths.admin.rmPost(postId),
          {
            method: "DELETE",
          },
          token
        );
        alert("게시글 삭제 완료!");
        const remainBoardData =
          AllBoardPosts?.filter((post) => post.id !== postId) || [];
        setBoardData(remainBoardData);
        return response;
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생", error);
        alert("게시글 삭제 중 오류 발생!");
        throw error;
      }
    }
  };

  const postsPerPage = 10;
  const totalPages = AllBoardPosts
    ? Math.ceil(AllBoardPosts.length / postsPerPage)
    : 0;
  const handlePrevPage = () => {
    setCurrPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  const handleNextPage = () => {
    setCurrPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };
  const currentBoardPosts = AllBoardPosts
    ? AllBoardPosts.slice(
        currPage * postsPerPage,
        (currPage + 1) * postsPerPage
      )
    : [];

  return !AllBoardPosts ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <OuterContainer>
        <Container>
          <Header>
            <Title $color={tokens.colors.simple.blackbasic}>
              게시글 리스트
            </Title>
            <p>최신순</p>
          </Header>
          {currentBoardPosts === null || currentBoardPosts.length === 0 ? (
            <>
              <div>게시글이 존재하지 않습니다.</div>
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
                    {currentBoardPosts.map((post) => (
                      <StyledTableRow key={post.id}>
                        <StyledTableCell>{post.id}</StyledTableCell>
                        <StyledTableCell>{post.category}</StyledTableCell>
                        <StyledTableCell>{post.title}</StyledTableCell>
                        <StyledTableCell>{post.nickname}</StyledTableCell>
                        <StyledTableCell>{post.createdAt}</StyledTableCell>
                        <StyledTableCell>{post.hit}</StyledTableCell>

                        <StyledTableCell>
                          <QuitButton onClick={() => handleRemove(post.id)}>
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

export default AdminBoards;
