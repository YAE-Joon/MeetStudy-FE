"use client";
import React, { RefObject, useRef } from "react";

import { FirstSectionLanding } from "./FirstSectionLanding";
import { SecondSectionLanding } from "./SecondSectionLanding";
import { ThirdSectionLanding } from "./ThirdSectionLanding";
import { ForthSectionLanding } from "./Landing";

import { OuterContainer } from "@/component/styled-components/Container";

/**
 * scroll 관련 동적 움직임을 위해 client component로 묶어 export합니다.
 */
const LandingPage = () => {
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const forthSectionRef = useRef(null);

  const scrollToNext = (sectionRef: RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <OuterContainer>
      <FirstSectionLanding
        ref={firstSectionRef}
        mover={() => scrollToNext(secondSectionRef)}
      />
      <SecondSectionLanding
        ref={secondSectionRef}
        mover={() => scrollToNext(thirdSectionRef)}
      />
      <ThirdSectionLanding
        ref={thirdSectionRef}
        mover={() => scrollToNext(forthSectionRef)}
      />
      <ForthSectionLanding
        ref={forthSectionRef}
        mover={() => scrollToNext(firstSectionRef)}
        studyRoomsData={studyRoomData}
      />
    </OuterContainer>
  );
};
export default LandingPage;

// 토큰 없는 api를 받을 수 없어서....

const studyRoomData = [
  {
    id: 1,
    title: "밋스터디",
    description:
      "백엔드/프론트엔드 개발자가 모여 지식을 공유하고, 프로젝트를 협력적으로 진행합니다.",
    createdDate: "24.06.05 15:00",
    userCapacity: 30,
    category: {
      name: "공학계열",
      description:
        "IT, 건축공학, 기계공학, 컴퓨터공학, 전기전자공학 등이 해당됩니다.",
    },
    userStudyRooms: [
      {
        id: 1,
        joinDate: "",
        permission: "MEMBER",
        studyRoomId: 1,
        user: {
          email: "-",
          password: "-",
        },
      },
      {
        id: 2,
        joinDate: "",
        permission: "MEMBER",
        studyRoomId: 1,
        user: {
          email: "-",
          password: "-",
        },
      },
      {
        id: 7,
        joinDate: "24.06.12 04:11",
        permission: "MEMBER",
        studyRoomId: 1,
        user: {
          email: "-",
          password: "-",
        },
      },
    ],
  },
  {
    id: 2,
    title: "아레나",
    description: "사례 공유, 토론과 모의법정을 주로 진행합니다!",
    createdDate: "24.06.12 01:15",
    userCapacity: 30,
    category: {
      name: "법학계열",
      description: "법학, 정치학, 행정학 등이 해당됩니다.",
    },
    userStudyRooms: [
      {
        id: 3,
        joinDate: "24.06.12 01:15",
        permission: "OWNER",
        studyRoomId: 2,
        user: {
          email: "-",
          password: "-",
        },
      },
    ],
  },
  {
    id: 5,
    title: "라운지",
    description:
      "전시회 정보 공유, 작품에 대한 의견을 나누는 것을 목적으로 합니다.",
    createdDate: "24.06.12 02:03",
    userCapacity: 4,
    category: {
      name: "예체능계열",
      description:
        "시각디자인, 동양화, 실용음악, 연극영화, 체육학과 등이 해당됩니다.",
    },
    userStudyRooms: [
      {
        id: 6,
        joinDate: "24.06.12 02:03",
        permission: "OWNER",
        studyRoomId: 5,
        user: {
          email: "-",
          password: "-",
        },
      },
      {
        id: 19,
        joinDate: "24.06.13 11:13",
        permission: "MEMBER",
        studyRoomId: 5,
        user: {
          email: "-",
          password: "-",
        },
      },
    ],
  },
  {
    id: 6,
    title: "연구소",
    description: "대회 출제 문제들에 도전하고 풀이/해석합니다.",
    createdDate: "24.06.12 07:59",
    userCapacity: 12,
    category: {
      name: "자연계열",
      description: "바이오, 물리학, 수학, 수의학, 천문학 등이 해당됩니다",
    },
    userStudyRooms: [
      {
        id: 9,
        joinDate: "24.06.12 07:59",
        permission: "OWNER",
        studyRoomId: 6,
        user: {
          email: "-",
          password: "-",
        },
      },
      {
        id: 16,
        joinDate: "24.06.12 17:25",
        permission: "MEMBER",
        studyRoomId: 6,
        user: {
          email: "-",
          password: "-",
        },
      },
    ],
  },
  {
    id: 10,
    title: "위저드",
    description: "HTML, CSS, JavaScript를 포함한 웹 기술에 대해 공부합니다!",
    createdDate: "24.06.12 14:04",
    userCapacity: 11,
    category: {
      name: "공학계열",
      description:
        "IT, 건축공학, 기계공학, 컴퓨터공학, 전기전자공학 등이 해당됩니다.",
    },
    userStudyRooms: [
      {
        id: 13,
        joinDate: "24.06.12 14:04",
        permission: "OWNER",
        studyRoomId: 10,
        user: {
          email: "-",
          password: "-",
        },
      },
    ],
  },
];
