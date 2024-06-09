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

import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";
import Loading from "@/component/Loading/Loading";

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
  //const [messages, setMessages] = useState<ReceivedChatMessage[]>([]); //불러온 메시지
  const [newMessage, setNewMessage] = useState(""); // 보낼 메시지 중 content
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  const chatRoomId = getChatRoomId();
  const currentUserId = 1;
  const currentUserNickName = "하영"; //임시로 id가 1인 유저의 닉네임을 넣음
  const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;

  // 기존 채팅 기록들을 불러옵니다.
  const [chatRecords, chatRecordError, isLoading] = useFetch<
    ReceivedChatMessage[]
  >(
    //apiPaths.chatroom.getRecords(chatRoomId),
    "/api/chat/chatSample",
    {},
    false,
    true
  );

  // 불러온 기존 데이터를 webSockethook으로 넘겨줍니다?
  // 왜? websocket에서 화면에서 그려지는 message를 통합으로 관리하기 때문에..

  const { messages, sendMessage } = useWebSocket(
    webSocketUrl,
    chatRoomId,
    chatRecords || []
  );

  const scrollToBottom = () => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    // 공백전송 방지용
    if (newMessage.trim()) {
      // 전송할 메시지
      const sendMessageObj: SendingChatMessage = {
        userId: currentUserId,
        content: newMessage,
        chatRoomId: chatRoomId,
      };

      // 서버로 전송할 메세지(body에 그대로 넣기만 하면 되는 걸 넣는다)
      const res = sendMessage<SendingChatMessage>(sendMessageObj);
      if (res.status) {
        setIsSending(false);
      } else {
        setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        setIsSending(false);
      }
    }
    setNewMessage("");
  };
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // 입력한 새로운 메시지
    setNewMessage(e.target.value);
  };

  if (isLoading) {
    return <div>"채팅로딩중(바꿀예정)"</div>;
  }

  if (error) {
    return <ChatRoomMain>Error: {error}</ChatRoomMain>;
  }

  if (!chatRecords) {
    return <ChatRoomMain>chatRecords 가 로딩중</ChatRoomMain>;
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
