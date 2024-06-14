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
      />
    </OuterContainer>
  );
};
export default LandingPage;
