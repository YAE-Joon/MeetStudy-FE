import Container from "@/component/styled-components/Container";
import SectionHori from "@/component/styled-components/SectionHori";
import Wrapper from "@/component/styled-components/Wrapper";
import DesignTokenVarNames from "@/lib/designToken/designTokens";
export default function Home() {
  return (
    <>
      <h1>랜딩 페이지</h1>
      <Container color={DesignTokenVarNames.colors.simple.secondary}>
        보임?
      </Container>
      <Wrapper>
        <section>온라인에서도 함께 섹션1</section>
        <section>온라인에서도 함께 섹션2</section>
        <section>온라인에서도 함께 섹션3</section>
        <section>온라인에서도 함께 섹션4</section>
      </Wrapper>
    </>
  );
}
