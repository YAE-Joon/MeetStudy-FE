import { usePathname } from "next/navigation";
import { RiUserFill } from "react-icons/ri";
import { StudyRoom } from "@/types/StudyRoom";
import convertDateTime from "@/util/dateTimeUtil";

import PackedStyledCards from "@/component/styled-components/Cards/StudyRoomCard/StyledCard";
import { JoinTag } from "@/component/styled-components/Cards/StudyRoomCard/StyledCardComponents";
const {
  StyledLinkContainer,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardDescription,
  CardFooter,
  MembersInfo,
  MembersCount,
  StyledLiWrapper,

  UserIcon,
} = PackedStyledCards;

/// 카드 컴포넌트에 대한 인터페이스 정의
interface StudyRoomCardProps {
  item: StudyRoom;
  root?: string | null;
  mail?: string;
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({
  item,
  root,
  mail,
}) => {
  if (root === "main") {
    return (
      <StyledLiWrapper>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardSubtitle>{`${convertDateTime(item.createdDate)}`}</CardSubtitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <MembersCount>
            <UserIcon>
              <RiUserFill />
            </UserIcon>
          </MembersCount>
          <MembersInfo></MembersInfo>
        </CardFooter>
      </StyledLiWrapper>
    );
  }
  // 유저 이메일을 불러옵니다.
  const myEmail = mail;

  const pathname = root ? (root === "main" ? "studyrooms" : "") : usePathname();

  const currMemberNum = item.userStudyRooms?.length ?? 0;

  function isEmailInStudyRoom(
    studyRoom: StudyRoom | undefined,
    myEmail: string
  ): boolean {
    return (
      studyRoom?.userStudyRooms?.some(
        (userStudyRoom) => userStudyRoom.user.email === myEmail
      ) ?? false
    );
  }

  return (
    <StyledLinkContainer href={`${pathname}/${item.id}`}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardSubtitle>{`${convertDateTime(item.createdDate)}`}</CardSubtitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <MembersCount>
          <UserIcon>
            <RiUserFill />
          </UserIcon>

          <span>{`${currMemberNum}/${item.userCapacity}`}</span>
        </MembersCount>
        <MembersInfo>
          {myEmail && isEmailInStudyRoom(item, myEmail) && (
            <JoinTag>참가중</JoinTag>
          )}
        </MembersInfo>
      </CardFooter>
    </StyledLinkContainer>
  );
};
