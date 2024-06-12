import { ChatMessage } from "@/lib/types";
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

import { SendingChatMessage, ReceivedChatMessage } from "@/types/Chatroom";

import { ChatRecordsResponse } from "@/types/Chat";
import getTokenByClient from "@/util/getTokenByClient";

//🙆‍♂️ 클라이언트
//❤️ next 서버
//🙆 백엔드 서버
// client - next.js 🙆‍♂️➡️➡️❤️
const useWebSocket = (
  wsUrl: string,
  chatRoomId: number,
  chatRecords: ReceivedChatMessage[]
) => {
  const [socket, setSocket] = useState<WebSocket | null>(new WebSocket(wsUrl));

  const [messages, setMessages] = useState<ReceivedChatMessage[]>(chatRecords);
  const [wsStompClient, setWsStompClient] = useState<Client | null>(null);

  // Authorization
  const userToken = getTokenByClient();
  const token = `Bearer ${userToken}`;

  const subscribeRoom = `/room/${chatRoomId}`;
  const sendMessageDestination = `/send/${chatRoomId}`;

  const enterRoomDestination = `/send/enter/${chatRoomId}`;
  const exitRoomDestination = `/send/exit/${chatRoomId}`;

  useEffect(() => {
    //ws로 통신하기 위해 웹소켓으로 만듦
    console.log(
      "🙆‍♂️ useWebsocket의 useEffect가 실행됩니다! wsStompClient 존재?",
      wsStompClient
    );
    if (wsStompClient && wsStompClient.connected) {
      console.log("🙆‍♂️ 이미 wsStompClient가 존재하고 연결되어 있습니다!");
      // 이미 stomp 연결이 되어 있음
      return;
    }
    console.log("🙆‍♂️ wsStompClient가 없습니다. 연결을 시도합니다!");
    const webSocketFactory = () => socket;

    const stompClient = new Client({
      webSocketFactory,
      reconnectDelay: 20000,
      connectHeaders: {
        Authorization: token,
      },
      debug: (str) => {
        console.log("🕷️[degub]: ", str);
      },
      beforeConnect: () => {
        console.log(
          `🙆‍♂️ 연결을 시도합니다: chatRoomId : ${chatRoomId} | ws Url : ${wsUrl}`
        );
      },
      onConnect: () => {
        console.log("🙆‍♂️Connected to WebSocket");

        stompClient.publish({
          destination: enterRoomDestination, //`/enter/${chatRoomId}`;
          body: JSON.stringify({
            // userId: 1, // 임시
            content: "🙆‍♂️ room에 연결을 시도합니다.",
            //chatRoomId: chatRoomId,
          }),
        });

        //connection이 완료 되면 /room/{chatRoomId} 으로 입장 메세지가 뜨고 메세지는 데이터베이스에 저장된다.

        stompClient.subscribe(subscribeRoom, (message) => {
          console.log(`🙆➡️➡️🙆‍♂️ Received: ${message.body}`);
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
        });
      },
      onStompError: (frame) => {
        console.error(
          `Broker에서 보내온 Error msesage: ${frame.headers["message"]}`
        );
        console.error(`추가 세부사항: ${frame.body}`);
      },
    });

    stompClient.activate();
    setWsStompClient(stompClient);

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination: exitRoomDestination,
          body: JSON.stringify({
            // userId: 1, // 임시
            content: "🙆‍♂️ 접속이 종료되었습니다",
            // chatRoomId: chatRoomId,
          }),
        });
        stompClient.deactivate();
      }
    };
  }, [wsUrl, chatRoomId, token]);

  // 클라이언트 컴포넌트에서 메시지를 보낼 때 사용함!
  const sendMessage = <T>(messageObj: T) => {
    console.log("🙆‍♂️➡️➡️🙆:", messageObj, "| stompClient:", wsStompClient);
    let response = { status: false, message: "" };
    let msg = "";
    if (wsStompClient && wsStompClient.connected) {
      try {
        wsStompClient.publish({
          destination: sendMessageDestination,
          body: JSON.stringify(messageObj),
          headers: {
            Authorization: token,
          },
        });
        response.status = true;
        return response;
      } catch (error) {
        msg = `[🙆‍♂️➡️➡️🙆] 메시지 전송 실패:", ${error}`;
        console.error(msg);
        response.message = msg;
        return response;
      }
    }
    msg = `[❌] stompClient가 연결되지 않음`;
    console.error(msg);
    response.message = msg;

    return response;
  };

  return { messages, sendMessage, setMessages };
};

export default useWebSocket;
