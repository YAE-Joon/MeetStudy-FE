import { useEffect, useState } from "react";
import { StudyRoom } from "@/types/StudyRoom";
import { usePathname } from "next/navigation";
import convertDateTime from "@/util/dateTimeUtil";
import { getUserInfoFromToken } from "@/util/getUserInfo";
import getTokenByClient from "@/util/getTokenByClient";

import dt from "@/lib/designToken/designTokens";
import { getRandomEmoji } from "@/util/getEmoji";
import { JoinTag } from "@/component/styled-components/Card";
import StyledCard from "@/component/styled-components/Card";
import {
  StyledProps,
  StyledComponentsProps,
} from "@/component/styled-components/styledProps";
import {
  Span,
  Description,
  Title,
} from "@/component/styled-components/TextBoxes";

const mobileWidth = dt.DesignTokenExcept.media.mobile;
const tokens = dt.DesignTokenVarNames;

const { StyledLink, CardContent, CardUpper_ul, Emoji } = StyledCard;
///// cards for studyroom list
interface StudyRoomCardProps {
  item: StudyRoom;
  root?: string | null;
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({ item, root }) => {
  const [myEmail, setMyEmail] = useState<string | null>(null);
  const pathname = root === null ? usePathname() : "main" ? "studyrooms" : "";

  useEffect(() => {
    const fetchEmail = async () => {
      const token = getTokenByClient();
      const email = await getUserInfoFromToken(token, "email");
      setMyEmail(email);

      console.log("[studyRoomCard] 참가중?", isEmailInStudyRoom(item, email));
    };

    fetchEmail();
  }, []);

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
    <StyledLink href={`${pathname}/${item.id}`}>
      <CardContent>
        <CardUpper_ul>
          <Emoji>{getRandomEmoji()}</Emoji>

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
  );
};
