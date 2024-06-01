import {
  FirstSectionLanding,
  SecondSectionLanding,
  ThirdSectionLanding,
} from "@/component/Landing";
import { Container } from "@/component/styled-components/Container";

import Wrapper from "@/component/styled-components/Wrapper";
import dt from "@/lib/designToken/designTokens";

export default function Home() {
  return (
    <>
      <h1>랜딩 페이지(개발중)</h1>

      <FirstSectionLanding />
      <SecondSectionLanding />
      <ThirdSectionLanding />

      <Wrapper>
        <section>온라인에서도 함께 섹션3</section>
        <section>온라인에서도 함께 섹션4</section>
      </Wrapper>
    </>
  );
}
