"use client";
import { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";

const { Footer, StyledTextarea, Button } = ChatStyled;

interface ChatTextAreaProps {
  onSendMessage: (message: string) => void;
}

export const ChatTextArea = ({ onSendMessage }: ChatTextAreaProps) => {
  const [newMessage, setNewMessage] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  //버튼을 눌러 메시지 보내기
  const handleClick = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
      //alert(`보낸 메시지 : ${newMessage}`); // 임시
    }
  };

  //엔터를 눌러 메시지 보내기
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim()) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        // 메시지 보내기 전 300ms로 관리
        debounceRef.current = setTimeout(() => {
          onSendMessage(newMessage);
          setNewMessage("");
        }, 300);
      }
    }
  };

  return (
    <Footer>
      <StyledTextarea
        placeholder="메세지를 입력하세요"
        value={newMessage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleClick}>보내기</Button>
    </Footer>
  );
};
