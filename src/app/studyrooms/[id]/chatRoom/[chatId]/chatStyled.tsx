"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const ChatRoomMain = styled.main`
  width: 100%;
  min-width: 300px;
  height: calc(100vh - 160px);

  flex: 1;
  overflow: auto;
  padding: 24px;
  //space-y: 16px;

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
`;

const Header = styled.header`
  width: 100%;
  background-color: #1a1a1a;
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
      ? `var(${tokens.colors.simple.secondary})`
      : `var(${tokens.colors.simple.whitebg})`};
  color: ${({ $isMyMsg }) => ($isMyMsg ? "white" : "black")};
  border-radius: 0.5rem;
  padding: 16px;
  max-width: 75%;
`;

const MessageAuthor = styled.p`
  font-weight: medium;
`;

const MessageText = styled.p`
  font-size: 0.875rem;
`;

const Footer = styled.div`
  width: 100%;
  background-color: var(${tokens.colors.simple.grayfortext});
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  border-radius: 0.5rem;
  padding: 8px;
  border: 1px solid "#555";
  background-color: "#333";
  color: black;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  background-color: var(${tokens.colors.simple.secondary});
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 0.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
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
};

export default ChatStyled;
