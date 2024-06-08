import { ChatMessage } from "@/lib/types";
import { useEffect, useState } from "react";
//import { dataJSONParser } from "@/app/api/auth/route";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
//🙆‍♂️ 클라이언트
//❤️ next 서버
//🙆 백엔드 서버
// client - next.js 🙆‍♂️➡️➡️❤️
const useWebSocket = (url: string, chatRoomId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [stompClient, setStompClient] = useState<Client | null>(null);

  // Authorization
  const userToken = process.env.NEXT_PUBLIC_TEST_TOKEN;
  const token = `Bearer ${userToken}`;
  // WebSocket URL
  const wsUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;
  const httpUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

  const subscribRoom = `/room/${chatRoomId}`;
  const sendMessageDestination = `/send/${chatRoomId}`;

  console.log("🙆‍♂️테스트: wsUrl:", wsUrl, "httpUrl:", httpUrl, "token", token);
  console.log(
    "🙆‍♂️구독 url:",
    subscribRoom,
    "메시지 보내는 목적지:",
    sendMessageDestination
  );

  useEffect(() => {
    // websocket API in client
    //const ws = new SockJs(wsUrl);
    //const sockJs = new SockJS(httpUrl); //sockJS는 http류만 지원함! 근데 우린 ws잖아? 안될거야...

    //ws로 통신하기 위해 웹소켓으로 만듦
    const webSocketFactory = () => new WebSocket(wsUrl);

    const stompClient = new Client({
      //webSocketFactory: () => sockJs, //http
      webSocketFactory,
      connectHeaders: {
        Authorization: token,
      },
      debug: (str) => {
        console.log("🕷️[degub]: ", str);
      },
      onConnect: () => {
        console.log("🙆‍♂️Connected to WebSocket");

        stompClient.subscribe(subscribRoom, (message) => {
          console.log(`🙆➡️➡️🙆‍♂️ Received: ${message.body}`);
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
        });

        stompClient.publish({
          destination: sendMessageDestination,
          body: JSON.stringify({ message: " 🙆‍♂️ room에 연결을 시도합니다." }),
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
    setStompClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [url, chatRoomId, token, httpUrl]);

  const sendMessage = (message: string) => {
    console.log("🙆‍♂️➡️➡️🙆:", message);
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: sendMessageDestination,
        body: JSON.stringify({ message }),
        headers: {
          Authorization: token,
        },
      });
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
