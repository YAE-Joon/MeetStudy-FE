import { StudyRoom } from "@/types/StudyRoom";
import { usePathname } from "next/navigation";
import useFetchUserInfo from "@/hooks/useGetUserInfo";
import convertDateTime from "@/util/dateTimeUtil";
import { RiUserFill } from "react-icons/ri";
import dt from "@/lib/designToken/designTokens";
import { getRandomEmoji } from "@/util/getEmoji";
import { JoinTag } from "@/component/styled-components/Card";
//import StyledCard from "@/component/styled-components/Card";

import {
  Span,
  Description,
  Title,
} from "@/component/styled-components/TextBoxes";

import PackedStyledCards from "@/component/styled-components/StudyRoomCard/StyledCard";
const mobileWidth = dt.DesignTokenExcept.media.mobile;
const tokens = dt.DesignTokenVarNames;

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

// const { StyledLink, CardContent, CardUpper_ul, Emoji, StyledWrapper } =
//   StyledCard;

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

// for main
export const MainStudyRoomCard = ({ item }: { item: StudyRoom }) => {
  // 유저 이메일을 불러옵니다.

  return (
    <li>
      <div>다시해보는중</div>
    </li>
  );
};

// return (
//   <li>
//     <StyledWrapper>
//       <CardContent>
//         <CardUpper_ul>
//           {/* <Emoji>{getRandomEmoji()}</Emoji> */}

//           <Title
//             $htype={3}
//             $fontSize={tokens.fontSize.web.medium}
//             $color={tokens.colors.simple.blackbasic}
//           >
//             {item.title}
//           </Title>
//           <p>{`카테고리 : ${item.category.name}`}</p>
//         </CardUpper_ul>

//         {/* <p>{item.description}</p> */}
//         <p>
//           {item.currMembers}/{item.userCapacity}
//         </p>
//       </CardContent>
//     </StyledWrapper>
//   </li>
// );
