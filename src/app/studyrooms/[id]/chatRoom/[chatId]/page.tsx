"use client";
// 채팅방
import { useState, ChangeEvent, useRef, useEffect } from "react";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import { ChatMessage, UserProfile } from "@/lib/types";
import useWebSocket from "@/webSocket/client";
import { getChatRoomId } from "@/app/studyrooms/studyroomSub";
import useFetch from "@/hooks/useFetch";
import { apiPaths } from "@/config/api";

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

  const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;
  const chatRoomId = getChatRoomId();

  const [userData, userDataFetchError] = useFetch<UserProfile>(
    apiPaths.mypage.info,
    {},
    false,
    false
  );
  const [chatRecords, chatRecordError] = useFetch<ChatMessage[]>(
    apiPaths.chatroom.getRecords(chatRoomId),
    {},
    false,
    false
  );
  const { messages: receivedMessages, sendMessage } = useWebSocket(
    webSocketUrl,
    chatRoomId.toString()
  );

  useEffect(() => {
    if (receivedMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
    }
  }, [receivedMessages]);

  const msgEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isMyMessage = async (
    myNickName: string,
    chatRecords: ChatMessage[]
  ) => {
    console.log("🙆‍♂️ 기존 채팅 데이터를 불러옵니다... ", chatRecords);

    const markedRecords = chatRecords.map((record) =>
      record.nickName === myNickName
        ? { ...record, isOwn: true }
        : { ...record, isOwn: false }
    );
    setMessages(markedRecords);
    setLoading(false);
  };

  useEffect(() => {
    if (userData && chatRecords) {
      isMyMessage(userData.nickname, chatRecords);
    }
  }, [userData, chatRecords]);

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

  if (!userData || !chatRecords) {
    return <div>!userData || !chatRecords</div>;
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
