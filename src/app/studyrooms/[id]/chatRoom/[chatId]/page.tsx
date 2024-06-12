"use client";
// 채팅방
//🙆‍♂️ 클라이언트
//🙆 백엔드 서버
// sending: 🙆‍♂️->🙆, received: 🙆->🙆‍♂️
import { useState, ChangeEvent, useRef, useEffect } from "react";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import useWebSocket from "@/webSocket/client";
import { SendingChatMessage, ReceivedChatMessage } from "@/types/Chatroom";
import { getChatRoomId } from "@/app/studyrooms/studyroomSub";

import { ChatRecordsResponse } from "@/types/Chat";

import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import Loading from "@/component/Loading/Loading";
import { ChatTextArea } from "@/app/studyrooms/[id]/chatRoom/[chatId]/ChatTextArea";

const {
  ChatRoomMain,
  MessageContainer,
  Message,
  MessageAuthor,
  MessageText,
  Footer,
  StyledTextarea,
  Button,
  ChatLoader,
} = ChatStyled;

export default function ChatRoom() {
  console.log("[채칭방] 채팅방 컴포넌트입니다.");
  //const [messages, setMessages] = useState<ReceivedChatMessage[]>([]); //불러온 메시지
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  const chatRoomId = getChatRoomId();
  const currentUserId = 1;
  const currentUserNickName = "하영"; //임시로 id가 1인 유저의 닉네임을 넣음
  const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;

  // 기존 채팅 기록들을 불러옵니다.
  const [chatRecords, chatRecordError, isLoading] =
    useFetch<ChatRecordsResponse>(
      apiPaths.chatroom.getRecords(chatRoomId),
      //"/api/chat/chatSample",
      {},
      false,
      false
    );

  console.log("❤️❤️❤️ chatRecords.content", chatRecords?.content);

  // 불러온 기존 데이터를 webSockethook으로 넘겨줍니다?
  // 왜? websocket에서 화면에서 그려지는 message를 통합으로 관리하기 때문에..

  const { messages, sendMessage } = useWebSocket(
    webSocketUrl,
    chatRoomId,
    chatRecords?.content || []
  );

  const scrollToBottom = () => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const sendMessageObj: SendingChatMessage = {
      userId: currentUserId,
      content: message,
      chatRoomId: chatRoomId,
    };

    const res = sendMessage<SendingChatMessage>(sendMessageObj);
    if (res.status) {
      setIsSending(false);
    } else {
      setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
      setIsSending(false);
    }
  };

  if (isLoading || !chatRecords) {
    return <ChatLoader />;
  }

  if (error) {
    return <ChatRoomMain>Error: {error}</ChatRoomMain>;
  }
  return (
    <>
      <ChatRoomMain>
        {messages.map((msg, index) => {
          //임시 idx로 처리
          let isMyMsg: boolean = msg.nickName === currentUserNickName;
          return (
            <MessageContainer
              key={index}
              $justify={isMyMsg ? "flex-end" : "flex-start"}
            >
              <Message $isMyMsg={isMyMsg}>
                <MessageAuthor>{msg.nickName}</MessageAuthor>
                <MessageText>{msg.content}</MessageText>
                <p>{msg.createdAt}</p>
              </Message>
            </MessageContainer>
          );
        })}
        <div ref={msgEndRef} />
      </ChatRoomMain>
      <Footer>
        {/* <StyledTextarea
          placeholder="메세지를 입력하세요"
          value={newMessage}
          onChange={onChange}
        />
        <Button onClick={handleSendMessage}>보내기</Button> */}
        <ChatTextArea onSendMessage={handleSendMessage} />
      </Footer>
    </>
  );
}
