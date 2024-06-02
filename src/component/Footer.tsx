import { Container } from "@/component/styled-components/Container";
import { FlexBoxH, FlexBoxV } from "@/component/styled-components/FlexBoxes";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;

const Footer = () => {
  return (
    <Container bgColor={tokens.colors.simple.primarydeeper}>
      <FlexBoxV>
        <FlexBoxH>
          <p>로고가 있을 자리</p>
          <p>깃허브 등이 있을 자리</p>
        </FlexBoxH>
      </FlexBoxV>
    </Container>
  );
};

export default Footer;
