"use client";
// 개별 스터디룸의 멤버 리스트
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";

import { StudyRoom } from "@/types/StudyRoom";

import { nullChecker } from "@/util/unllChecker";
import { setDateStr, convertISOToYMD } from "@/util/dateUtils";

import { MemberCard } from "@/component/styled-components/Card";
import { Container } from "@/component/styled-components/Container";
import StyledStudyRoomIndex from "@/app/studyrooms/StudyRoomIndexClientComponents";
const { SearchResultContainer } = StyledStudyRoomIndex;

export default function MemberLists() {
  console.log("[id/memberlist] 멤버 페이지 컴포넌트입니다.");
  const roomId = Number(useParams().id);
  // 입장한 스터디룸에 대한 정보를 불러옵니다.
  const [studyRoomData, error] = useFetch<StudyRoom>(
    apiPaths.studyrooms.detail(roomId),
    {},
    false,
    false
  );

  const currentMembers = studyRoomData?.userStudyRooms?.map((member) => {
    const { id, joinDate, permission, user } = member;
    const memberInfo = {
      id,
      joinDate,
      permission,
      email: user.email,
    };
    return memberInfo;
  });

  return !studyRoomData ? (
    <div>목록 로딩중</div>
  ) : (
    <>
      <Container $width={"100%"} $minWidth={"600px"}>
        <SearchResultContainer>
          {currentMembers?.map((member, index) => (
            <MemberCard
              key={member.id}
              id={member.id}
              email={member.email}
              joinDate={nullChecker(member.joinDate, "string", (value) =>
                setDateStr(convertISOToYMD(value))
              )}
              permission={member.permission}
            />
          ))}
        </SearchResultContainer>
      </Container>
    </>
  );
}
