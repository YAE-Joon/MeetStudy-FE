"use client";
// 채팅방
import { useState, ChangeEvent, useRef, useEffect } from "react";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { ChatMessage } from "@/lib/types";
import useWebSocket from "@/webSocket/client";
import { getChatRoomId } from "@/app/studyrooms/studyroomSub";

const {
  ChatRoomMain,
  MessageContainer,
  Message,
  MessageAuthor,
  MessageText,
  Footer,
  StyledTextarea,
  Button,
} = ChatStyled;

export default function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //websocketw
  const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;

  const chatRoomId = getChatRoomId();

  const { messages: receivedMessages, sendMessage } = useWebSocket(
    webSocketUrl,
    chatRoomId.toString()
  );

  // websocket이 보내는 메시지를 저장
  useEffect(() => {
    if (receivedMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
    }
  }, [receivedMessages]);

  // console.log("pathname", pathname); //pathname /studyrooms/1/chatRoom/0

  const msgEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 이동하는 함수
  const scrollToBottom = () => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 채팅 기록 불러오기
  const fetchChatRecords = async () => {
    try {
      const response = await fetch("/api/chat/chatSample");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const chatRecords: ChatMessage[] = await response.json();

      const myNickname = "주니어프론트";
      const markedRecords = chatRecords.map((record) =>
        record.nickName === myNickname
          ? { ...record, isOwn: true }
          : { ...record, isOwn: false }
      );
      setMessages(markedRecords);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chat records:", error);
      setError("Failed to fetch chat records");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRecords();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageObject: ChatMessage = {
        nickName: "나",
        content: newMessage,
        isOwn: true,
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, messageObject]);
      setMessages((prevMessages) => [...prevMessages, messageObject]);
      sendMessage(JSON.stringify(messageObject));
      setNewMessage("");
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  if (loading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ChatRoomMain>
        {messages.map((msg, index) => (
          <MessageContainer
            key={index}
            $justify={msg.isOwn ? "flex-end" : "flex-start"}
          >
            <Message $isOwn={msg.isOwn}>
              <MessageAuthor>{msg.nickName}</MessageAuthor>
              <MessageText>{msg.content}</MessageText>
              <p>{msg.createdAt}</p>
            </Message>
          </MessageContainer>
        ))}
        <div ref={msgEndRef} />
      </ChatRoomMain>
      <Footer>
        <StyledTextarea
          placeholder="메세지를 입력하세요"
          value={newMessage}
          onChange={onChange}
        />
        <Button onClick={handleSendMessage}>보내기</Button>
      </Footer>
    </>
  );
}
