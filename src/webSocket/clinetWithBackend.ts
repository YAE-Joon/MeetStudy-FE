// code for client - backend direct connection

// import { ChatMessage } from "@/lib/types";
// import WebSocket from "ws";
// import { useEffect, useState } from "react";
// import { dataJSONParser } from "@/app/api/auth/route";

// const useWebSocket = (url: string) => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   // Authorization
//   const userToken = process.env.NEXT_PUBLIC_TEST_TOKEN;
//   const token = `Bearer ${userToken}`;

//   // WebSocket URL
//   const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;

//   useEffect(() => {
//     //초기 인증하기
//     //일단 백엔드의 proxy 서버와 통신

//     const validFromBE = fetch("/api/auth", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     //인증 후
//     validFromBE
//       .then((res) => res.json())
//       .then((data) => {
//         const websocket = new WebSocket(webSocketUrl);
//         websocket.onopen = () => {
//           console.log("websocket.onopen: 연결되었습니다!");
//           websocket.send("hi!");
//         };

//         websocket.onmessage = (event: WebSocket.MessageEvent) => {

//           let receivedMessage = dataJSONParser(event.data)
//           console.log("🙆‍♂️ | receivedMessage", receivedMessage)
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         };
//         websocket.onclose = () => {
//           console.log("WebSocket connection closed");
//         };

//         setSocket(websocket);

//         return () => {
//           websocket.close();
//         };
//       });
//   }, [url]);

//   const sendMessage = (message: string) => {
//     console.log("클라이언트에서 메시지를 보냅니다!: msg", message);
//     if (socket) {
//       socket.send(message);
//     }
//   };

//   return { messages, sendMessage };
// };

// export default useWebSocket;
