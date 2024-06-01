"use client";
import React, { RefObject, useRef } from "react";

import {
  FirstSectionLanding,
  ForthSectionLanding,
  SecondSectionLanding,
  ThirdSectionLanding,
} from "@/component/landingPage/Landing";
import { OuterContainer } from "@/component/styled-components/Container";
import Link from "next/link";

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
      <Link href={"/main"}>[개발중/임시 링크] 메인(로그인 후)로 이동</Link>
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
