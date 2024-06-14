"use client";
import { useEffect, useState } from "react";
import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";
import getTokenByClient from "@/util/getTokenByClient";
import { StudyRoom } from "@/types/StudyRoom";
import useFetchUserInfo from "@/hooks/useGetUserInfo";
import dt from "@/lib/designToken/designTokens";
import { Title } from "@/component/styled-components/TextBoxes";
import { MainSkleton } from "@/component/mainPage/mainStyledComponents";
import { StyledStudyRoomsPack } from "@/component/mainPage/mainStyledComponents";
import StyledAdminUserPage from "@/app/admin/UserStyled";
import { processDateTime } from "@/util/dateUtilsFinal";
const { MainTableWrapper, StyledLink } = StyledStudyRoomsPack;
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
    // console.log("[myStudyrooms] 호출합니다: 현재 user eamil:", userEmail);
    const token = getTokenByClient();
    if (!userEmail || typeof userEmail !== "string") {
      return;
    }
    // user의 스터디룸 목록 조회
    const loadData = async () => {
      try {
        const apiUrl = apiPaths.studyrooms.byUser(userEmail);
        // console.log(
        //   "useFetch에서 데이터를 호출합니다: apiUrl, options, isAdmin, isTest",
        //   apiUrl,
        //   {},
        //   token
        // );
        const data = await fetchDataBE(apiUrl, {}, token);
        setmyStudyRoomsData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("[⚠️] 알 수 없는 에러가 발생했습니다."));
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userEmail]);

  async function handleRemove(studyRoomId: number) {
    if (confirm("[⚠️] 정말로 이 스터디룸에서 탈퇴하시겠습니까?")) {
      try {
        const token = getTokenByClient();
        const response = await fetchDataBE(
          apiPaths.userStudyrooms.leave(studyRoomId),
          {
            method: "DELETE",
          },
          token
        );
        const removedStudyRoomData: StudyRoom[] =
          myStudyRoomsData?.filter(
            (studyroom) => studyroom.id !== studyRoomId
          ) ?? [];
        const result =
          removedStudyRoomData.length === 0 ? [] : removedStudyRoomData;
        alert("[📢] 스터디룸 탈퇴를 완료하였습니다.");
        setmyStudyRoomsData(result);

        return response;
      } catch (error) {
        console.error("스터디룸 탈퇴 중 오류 발생", error);
        alert("[❌]  스터디룸 탈퇴 중 오류 발생!");
        throw error;
      }
    }
  }

  if (loading) {
    return <MainSkleton />;
  }
  const tableHeadList = ["스터디명", "가입일", "관리"];

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
          width: "100%",
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
                      <StyledTableCell>
                        <StyledLink href={`/studyrooms/${room.id}`}>
                          {room.title}{" "}
                        </StyledLink>
                      </StyledTableCell>
                      <StyledTableCell>
                        {processDateTime(room.createdDate).formattedDate}
                      </StyledTableCell>
                      {/* <StyledTableCell>{room.description}</StyledTableCell> */}
                      <StyledTableCell>
                        <QuitButton
                          onClick={() =>
                            room.id !== undefined
                              ? handleRemove(room.id)
                              : alert("오류 발생")
                          }
                        >
                          탈퇴
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
