"use client";
import { ChangeEvent } from "react";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";

const { Footer, StyledTextarea, Button } = ChatStyled;

interface ChatTextAreaProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onClick: () => void;
}

export const ChatTextArea = ({
  newMessage,
  setNewMessage,
  onClick,
}: ChatTextAreaProps) => {
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <Footer>
      <StyledTextarea
        placeholder="메세지를 입력하세요"
        value={newMessage}
        onChange={onChange}
      />
      <Button onClick={onClick}>보내기</Button>
    </Footer>
  );
};
