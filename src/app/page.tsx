import { FirstSection, SecondSection } from "@/component/Landing";
import { Container } from "@/component/styled-components/Container";

import Wrapper from "@/component/styled-components/Wrapper";
import dt from "@/lib/designToken/designTokens";
const DesignTokenVarNames = dt.DesignTokenVarNames;

export default function Home() {
  return (
    <>
      <h1>랜딩 페이지(개발중)</h1>
      <Container
        color={DesignTokenVarNames.colors.simple.secondary}
        padding={"2rem 0 2rem 0"}
        gap={"3px"}
      >
        <FirstSection />
      </Container>
      <Container
        color={DesignTokenVarNames.colors.simple.tertiarygray}
        padding={"2rem 0 2rem 0"}
        gap={"3px"}
      >
        <SecondSection />
      </Container>
      <Wrapper>
        <section>온라인에서도 함께 섹션3</section>
        <section>온라인에서도 함께 섹션4</section>
      </Wrapper>
    </>
  );
}
