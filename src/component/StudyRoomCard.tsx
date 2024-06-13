import { StudyRoom } from "@/types/StudyRoom";
import { usePathname } from "next/navigation";
import useFetchUserInfo from "@/hooks/useGetUserInfo";
import convertDateTime from "@/util/dateTimeUtil";

import dt from "@/lib/designToken/designTokens";
import { getRandomEmoji } from "@/util/getEmoji";
import { JoinTag } from "@/component/styled-components/Card";
import StyledCard from "@/component/styled-components/Card";

import {
  Span,
  Description,
  Title,
} from "@/component/styled-components/TextBoxes";

const mobileWidth = dt.DesignTokenExcept.media.mobile;
const tokens = dt.DesignTokenVarNames;

const { StyledLink, CardContent, CardUpper_ul, Emoji, StyledWrapper } =
  StyledCard;

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
  // 유저 이메일을 불러옵니다.
  const myEmail = mail;

  const pathname = root ? (root === "main" ? "studyrooms" : "") : usePathname();

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
    <li>
      <StyledLink href={`${pathname}/${item.id}`}>
        <CardContent>
          <CardUpper_ul>
            {/* <Emoji>{getRandomEmoji()}</Emoji> */}

            <Title
              $htype={3}
              $fontSize={tokens.fontSize.web.medium}
              $color={tokens.colors.simple.blackbasic}
            >
              {item.title}
            </Title>

            <Span content={`생성일: ${convertDateTime(item.createdDate)}`} />
          </CardUpper_ul>

          <Description
            content={item.description}
            color={tokens.colors.simple.grayfortext}
          />
          {myEmail && isEmailInStudyRoom(item, myEmail) && (
            <JoinTag>참가중</JoinTag>
          )}
        </CardContent>
      </StyledLink>
    </li>
  );
};

// for main
export const MainStudyRoomCard = ({ item }: { item: StudyRoom }) => {
  // 유저 이메일을 불러옵니다.

  return (
    <li>
      <StyledWrapper>
        <CardContent>
          <CardUpper_ul>
            {/* <Emoji>{getRandomEmoji()}</Emoji> */}

            <Title
              $htype={3}
              $fontSize={tokens.fontSize.web.medium}
              $color={tokens.colors.simple.blackbasic}
            >
              {item.title}
            </Title>
            <p>{`카테고리 : ${item.category.name}`}</p>
          </CardUpper_ul>

          {/* <p>{item.description}</p> */}
          <p>
            {item.currMembers}/{item.userCapacity}
          </p>
        </CardContent>
      </StyledWrapper>
    </li>
  );
};
