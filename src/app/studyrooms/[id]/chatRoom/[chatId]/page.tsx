"use client";
// 채팅방
//🙆‍♂️ 클라이언트
//🙆 백엔드 서버
// sending: 🙆‍♂️->🙆, received: 🙆->🙆‍♂️
import { useState, useRef, useEffect, ChangeEvent } from "react";

import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";
import useWebSocket from "@/webSocket/client";

import { SendingChatMessage, ReceivedChatMessage } from "@/types/Chatroom";
import { ChatRecordsResponse } from "@/types/Chat";
import { getChatRoomId } from "@/app/studyrooms/studyroomSub";

import { ChatTextArea } from "@/app/studyrooms/[id]/chatRoom/[chatId]/ChatTextArea";
import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";

import { checkEnterOrExitFromMessages } from "@/util/checkChatText";
import { fetchData } from "next-auth/client/_utils";
import useFetch from "@/hooks/useFetch";
import useFetchUserInfo from "@/hooks/useGetUserInfo";
import getTokenByClient from "@/util/getTokenByClient";
const {
  ChatRoomMain,
  MessageContainer,
  Message,
  MessageAuthor,
  MessageText,
  ChatLoader,
  Announcement,
} = ChatStyled;

export default function ChatRoom() {
  console.log("[채칭방] 🧊 채팅방 컴포넌트입니다.");
  //const [myCurrNickName, setMyCurrNickName] = useState<string>("");
  // const [nickname, setNickname] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  // for API request
  const chatRoomId = getChatRoomId();
  const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;
  // for get past chat records
  const [cursor, setCursor] = useState(null);

  // for message(from chat) and record(from db)
  const [oldRecords, setOldRecords] = useState<ReceivedChatMessage[]>([]);
  const [chatRecords, setChatRecords] = useState<ChatRecordsResponse | null>(
    null
  );
  // for scolling
  const msgEndRef = useRef<HTMLDivElement>(null);
  const msgContainerRef = useRef<HTMLDivElement>(null);
  const oldRecordRef = useRef<HTMLDivElement>(null);
  const isOldRecordUpdatedRef = useRef(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isEnd, setIsEnd] = useState(false);

  // 기존 채팅 기록들을 불러옵니다. (첫번째 cursor)

  const [myCurrNickName, errorFromNickname, loading] =
    useFetchUserInfo("nickname");
  useEffect(() => {
    // const fetchUserInfo = async () => {
    //   console.log("유저 데이터를 토큰으로 가져옵니다다");
    //   const apiUrl = apiPaths.mypage.info;
    //   //const response = await fetchDataBE(apiUrl, {});
    //   const response = await useFetch
    //   const fetchedUserNickname = response.nickname;
    //   console.log("fethc해서 가져온 유저정보: response", response);
    //   setMyCurrNickName(fetchedUserNickname);
    // };
    const token = getTokenByClient();
    const fetchInitialChatRecords = async () => {
      console.log("이전 채팅 기록을 가져옵니다");
      try {
        const apiUrl = `${apiPaths.chatroom.getRecords(
          chatRoomId
        )}?cursor=${-1}`;
        const response = await fetchDataBE(apiUrl, {}, token);
        const fetchedNearRecords = [...response.content].reverse(); //copy !
        const newCursor = response.pageable.cursor;

        if (fetchedNearRecords.length === 0) {
          setIsEnd((prev) => !prev);
          return;
        }

        setOldRecords(fetchedNearRecords);
        setCursor(newCursor);
      } catch (error) {}
    };

    fetchInitialChatRecords();
  }, [myCurrNickName]);

  // 불러온 기존 데이터를 webSockethook으로 넘겨줍니다
  // 왜? websocket에서 화면에서 그려지는 message를 통합으로 관리하기 때문에..
  const { messages, sendMessage, setMessages } = useWebSocket(
    webSocketUrl,
    chatRoomId,
    chatRecords?.content || []
  );

  // 이전 채팅 기록에 변동이 일어날 시
  useEffect(() => {
    if (cursor == -1) {
      // 변동은 있었으나 첫 접속 때라면 bottom으로 이동하도록
      scrollToBottom();
      return;
    }
    // 그 외의 경우는 oldRecord div의 아랫쪽(이전 채팅기록 요청시 최상단)으로
    scrollToLastOldRecord();
  }, [oldRecords]);

  // websocket에서 받는 채팅 메시지에 변동이 있을 때
  useEffect(() => {
    if (isOldRecordUpdatedRef.current) {
      //이전 메시지 불러오기라면
      isOldRecordUpdatedRef.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  async function fetchChatRecords(cursorVlaue: number) {
    try {
      const apiUrl = `${apiPaths.chatroom.getRecords(
        chatRoomId
      )}?cursor=${cursorVlaue}`;
      const token = getTokenByClient();
      const response = await fetchDataBE(apiUrl, {}, token);
      const fetchedOldRecords = response.content;
      const newCursor = response.pageable.cursor;

      // 기존에 존재하는 과거 채팅 기록을 temp에 담고
      const existingOldRecord = oldRecords;
      // fetch해온 데이터를 oldRecord 상태변수에 넣는다.
      setOldRecords(fetchedOldRecords);
      // temp에 넣은 데이터를 기존 데이터의 앞에 넣는다.
      setMessages((prev) => [...existingOldRecord, ...prev]);
      isOldRecordUpdatedRef.current = true;

      setCursor(newCursor);

      //setOldRecords((prev) => [...newChatRecords, ...prev]);
      //setMessages((prev) => [...newChatRecords, ...prev]);

      console.log(
        `🧊🧊🧊fetch 한 이전 기록들 / cursor=${cursor}| 메시지 갯수:${fetchedOldRecords.length} | 메시지 내용: `,
        fetchedOldRecords
      );

      if (fetchedOldRecords.length === 0) {
        setIsEnd((prev) => !prev);
        return;
      }
    } catch (error) {}
  }

  ///////////// fetch function , hanlders ///////////////

  // websocket 으로 메시지 보내는 핸들러
  async function handleSendMessage(message: string) {
    const sendMessageObj: SendingChatMessage = {
      content: message,
    };

    const res = sendMessage<SendingChatMessage>(sendMessageObj);
    if (res.status) {
      setIsSending(false);
    } else {
      setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
      setIsSending(false);
    }
  }

  // 이전 채팅 기록 불러오기 handler
  function hanldeMessageReq() {
    console.log("🧊🧊이전 대화 기록을 요청합니다 | cursor?", cursor);
    //setCursor((prev) => prev + 1);
    if (cursor !== null && cursor !== -1) {
      fetchChatRecords(cursor);
    }
  }

  // scroll handlers //
  function scrollToBottom() {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function scrollToLastOldRecord() {
    if (oldRecordRef.current) {
      oldRecordRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;

  //   if (debounceTimeout.current) {
  //     clearTimeout(debounceTimeout.current);
  //   }

  //   debounceTimeout.current = setTimeout(() => {
  //     setNickname(value);
  //   }, 300); // 300ms debounce delay
  // };

  // const handleButton = () => {
  //   setMyCurrNickName(nickname);
  // };

  if (!oldRecords) {
    return <ChatLoader />;
  }

  if (error) {
    return <ChatRoomMain>Error: {error}</ChatRoomMain>;
  }
  return (
    <>
      {/* <input
        placeholder="닉네임을 입력하세요;"
        value={nickname}
        onChange={handleInput}
      />
      <button onClick={handleButton}>닉네임 입력하기</button> */}
      <ChatRoomMain>
        <Announcement>
          {!isEnd ? (
            <button onClick={hanldeMessageReq}>이전 기록 불러오기</button>
          ) : (
            <p>마지막 기록입니다.</p>
          )}
        </Announcement>

        <div ref={msgContainerRef}>
          {oldRecords.reverse().map((msg, index) => {
            let isMyMsg = msg.nickName === myCurrNickName;
            let isAnnounce = checkEnterOrExitFromMessages(msg.content);
            if (isAnnounce) {
              return (
                <Announcement key={index}>
                  ----- {msg.content} -----
                </Announcement>
              );
            }
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
          <div ref={oldRecordRef} />
        </div>
        <div ref={msgContainerRef} style={{ height: "100%" }}>
          {messages.map((msg, index) => {
            let isMyMsg: boolean = msg.nickName === myCurrNickName;
            let isAnnounce = checkEnterOrExitFromMessages(msg.content);
            if (isAnnounce) {
              return (
                <Announcement key={index}>
                  ----- {msg.content} -----
                </Announcement>
              );
            }
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
          <div ref={msgEndRef} style={{ height: "1rem" }} />
        </div>
      </ChatRoomMain>

      <ChatTextArea onSendMessage={handleSendMessage} />
    </>
  );
}
