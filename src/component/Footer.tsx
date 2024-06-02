import dt from "@/lib/designToken/designTokens";
import styled from "styled-components";
const tokens = dt.DesignTokenVarNames;

const FooterContainer = styled.footer`
  width: 100%;
  background-color: var(${tokens.colors.simple.primarydeeper});
  color: white;
  text-align: center;
  padding: 10px 0;
`;

const FooterUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterUl>
        <li>로고</li>
        <li>링크</li>
      </FooterUl>
    </FooterContainer>
  );
};

export default Footer;
