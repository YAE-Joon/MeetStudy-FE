"use client";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import { StudyRoom, UserStudyRoom } from "@/types/StudyRoom";

import dt from "@/lib/designToken/designTokens";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";

import { DailyList } from "@/component/mainPage/mainClinentComponents";

import { Title } from "@/component/styled-components/TextBoxes";
import { MainSkleton } from "@/component/mainPage/mainStyledComponents";

import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
import { StudyRoomCard } from "@/component/StudyRoomCard";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
import { StyledStudyRoomsPack } from "@/component/mainPage/mainStyledComponents";
import useFetchUserInfo from "@/hooks/useGetUserInfo";
import { UserProfile } from "@/types/User";
import { useEffect, useState } from "react";
import fetchDataBE from "@/lib/fetch";
import getTokenByClient from "@/util/getTokenByClient";
const {
  InnerContainer,

  SearchBarWarpper,
  InputContainer,
  SearchResultContainer,
} = StyledStudyRoomIndex;
import StyledAdminUserPage from "@/app/admin/UserStyled";
import { processDateTime } from "@/util/dateUtilsFinal";
const { MyStudyRoomsContainer, MainTableWrapper } = StyledStudyRoomsPack;
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

const tokens = dt.DesignTokenVarNames;

const MyStudyRooms = () => {
  const [myStudyRoomsData, setmyStudyRoomsData] = useState<StudyRoom[] | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, fetchUserError, fetchUserloading] =
    useFetchUserInfo("email");

  useEffect(() => {
    console.log("[myStudyrooms] 호출합니다: 현재 user eamil:", userEmail);
    const token = getTokenByClient();
    if (!userEmail || typeof userEmail !== "string") {
      return;
    }
    // user의 스터디룸 목록 조회
    const loadData = async () => {
      try {
        const apiUrl = apiPaths.studyrooms.byUser(userEmail);
        console.log(
          "useFetch에서 데이터를 호출합니다: apiUrl, options, isAdmin, isTest",
          apiUrl,
          {},
          token
        );
        const data = await fetchDataBE(apiUrl, {}, token);
        setmyStudyRoomsData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("알 수 없는 에러가 발생했습니다."));
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userEmail]);

  async function handleRemove(studyRoomId: number) {
    if (confirm("정말로 이 스터디룸에서 탈퇴하시겠습니까?")) {
      try {
        const token = getTokenByClient();
        const response = await fetchDataBE(
          apiPaths.studyrooms.delete(studyRoomId),
          {
            method: "DELETE",
          },
          token
        );
        alert("스터디룸 탈퇴완료!");
        return response;
      } catch (error) {
        console.error("스터디룸 탈퇴 중 오류 발생", error);
        alert("스터디룸 탈퇴 중 오류 발생!");
        throw error;
      }
    }
  }

  if (loading) {
    return <MainSkleton />;
  }
  const tableHeadList = ["스터디명", "생성일", "한줄설명"];

  console.log(
    "????????????? myStudyRoomsData ???????????????",
    myStudyRoomsData
  );
  return (
    <>
      <Title
        $htype={3}
        $fontSize={tokens.fontSize.web.medium}
        $color={tokens.colors.simple.blackbasic}
      >
        내가 참여중인 스터디들
      </Title>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {!myStudyRoomsData || myStudyRoomsData?.length === 0 ? (
          <div>참가한 스터디룸 정보가 없습니다.</div>
        ) : (
          // <MyStudyRoomsContainer>
          //   {myStudyRoomsData.map((studyRoom, idx) => (
          //     <StudyRoomCard
          //       key={studyRoom.id}
          //       item={studyRoom}
          //       root={"main"}
          //     />
          //   ))}

          <MainTableWrapper>
            <StyledTable>
              <StyledTableHeader>
                <StyledTableRow>
                  {tableHeadList.map((head, idx) => (
                    <StyledTableHead key={idx}>{head}</StyledTableHead>
                  ))}
                </StyledTableRow>
              </StyledTableHeader>
              <StyledTableBody>
                {myStudyRoomsData.map((room) =>
                  room.id !== undefined ? (
                    <StyledTableRow key={room.id}>
                      <StyledTableCell>{room.title}</StyledTableCell>
                      <StyledTableCell>
                        {processDateTime(room.createdDate).formattedDate}
                      </StyledTableCell>
                      <StyledTableCell>{room.description}</StyledTableCell>
                      <StyledTableCell>
                        <QuitButton onClick={() => handleRemove(room?.id)}>
                          삭제
                        </QuitButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : null
                )}
              </StyledTableBody>
            </StyledTable>
          </MainTableWrapper>
          // </MyStudyRoomsContainer>
        )}
      </div>
    </>
  );
};

export default MyStudyRooms;
