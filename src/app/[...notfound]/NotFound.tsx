"use client";
import Packed404Components from "./Styled404";

const { Container, Content, Title, Message, HomeLink } = Packed404Components;

const NotFoundPage = () => {
  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Message>죄송합니다. 찾고 있는 페이지가 존재하지 않습니다</Message>
        <HomeLink href={"/"}>메인으로</HomeLink>
      </Content>
    </Container>
  );
};

export default NotFoundPage;
