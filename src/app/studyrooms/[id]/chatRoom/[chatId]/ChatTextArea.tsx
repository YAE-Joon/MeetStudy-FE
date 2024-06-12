"use client";
import { useState, ChangeEvent } from "react";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";

const { Footer, StyledTextarea, Button } = ChatStyled;

interface ChatTextAreaProps {
  onSendMessage: (message: string) => void;
}

export const ChatTextArea = ({ onSendMessage }: ChatTextAreaProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleClick = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
      alert(`보낸 메시지 : ${newMessage}`); // 임시
    }
  };

  return (
    <Footer>
      <StyledTextarea
        placeholder="메세지를 입력하세요"
        value={newMessage}
        onChange={handleChange}
      />
      <Button onClick={handleClick}>보내기</Button>
    </Footer>
  );
};
