"use client";
import styled, { keyframes } from "styled-components";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const ChatRoomMain = styled.main`
  width: 100%;
  min-width: 300px;
  height: calc(100vh - 160px);

  flex: 1;
  overflow: auto;
  padding: 16px;
  //space-y: 16px;

  background-color: var(${tokens.colors.simple.whitebg});
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  background-color: var(${tokens.colors.simple.tertiarygray});

  &::-webkit-scrollbar {
    width: 20px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 6px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 6px;
  }

  //반응형
`;

const Header = styled.header`
  width: 100%;
  background-color: var(${tokens.colors.simple.primarydeeper});
  color: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

//말풍선
interface MessageContainerProps {
  $justify?: string;
}

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: start;
  gap: 16px;
  ${({ $justify }) => $justify && `justify-content: ${$justify};`}
  margin-bottom: 1rem;
`;

interface MessageProps {
  $isMyMsg?: boolean;
}

const Message = styled.div<MessageProps>`
  background-color: ${({ $isMyMsg }) =>
    $isMyMsg
      ? `var(${tokens.colors.simple.primary})`
      : `var(${tokens.colors.simple.whitebg})`};
  color: ${({ $isMyMsg }) => ($isMyMsg ? "white" : "black")};
  border-radius: 0.5rem;
  padding: 16px;
  max-width: 75%;

  //background-color: green;
`;

const MessageAuthor = styled.p`
  font-weight: medium;
`;

const MessageText = styled.p`
  font-size: 0.875rem;
`;

const Announcement = styled.div`
  text-align: center;
  color: #555555;
  margin: 1rem 0;
`;

const Footer = styled.div`
  width: 100%;
  background-color: var(${tokens.colors.simple.whitebg});
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 5px;
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  border-radius: 0.5rem;
  padding: 8px;
  border: 1px solid "#555";
  background-color: "#333";
  color: black;

  min-width: 200px;
  max-width: 100%;
  min-height: 100px;
  max-height: 300px;
  resize: vertical; /* 사용자가 세로 방향으로 크기 조절 가능 */

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  background-color: var(${tokens.colors.simple.primary});
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 0.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

/// chat loader
interface LetterProps {
  $delay: number;
}

const blink = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  gap: 10px;

  font-size: var(${tokens.fontSize.web.large});
  height: 100%;
  width: 100%;
`;

const Letter = styled.span<LetterProps>`
  color: white;
  /* background-color: var(${tokens.colors.simple.whitebg}); */

  animation: ${blink} 1.5s infinite;
  animation-delay: ${(props) => props.$delay}s;
`;

const ChatLoader = () => {
  const message = "대화를 불러오는 중입니다...";

  return (
    <Container>
      {message.split("").map((letter, index) => (
        <Letter key={index} $delay={index * 0.1}>
          {letter}
        </Letter>
      ))}
    </Container>
  );
};

const ChatStyled = {
  Header,
  Title,
  HeaderButtons,
  IconButton,
  ChatRoomMain,
  MessageContainer,
  Message,
  MessageAuthor,
  MessageText,
  Footer,
  StyledTextarea,
  Button,
  ChatLoader,
  Announcement,
};

export default ChatStyled;
