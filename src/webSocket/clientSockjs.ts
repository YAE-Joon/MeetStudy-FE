// import { ChatMessage } from "@/lib/types";
// import { useEffect, useState } from "react";
// //import { dataJSONParser } from "@/app/api/auth/route";
// import SockJs from "sockjs-client";

// //🙆‍♂️ 클라이언트
// //❤️ next 서버
// //🙆 백엔드 서버
// // client - next.js 🙆‍♂️➡️➡️❤️
// const useWebSocket = (url: string, chatRoomId: string) => {
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

//     // websocket API in client

//     const ws = new SockJs(webSocketUrl);

//     ws.onopen = () => {
//       console.log("🙆‍♂️➡️➡️❤️ : connected with backend server");
//       console.log("🙆‍♂️➡️➡️❤️ : JSON 토큰을 전송합니다");
//       ws.send(JSON.stringify({ type: "auth", token }));
//     };

//     ws.onmessage = (event: MessageEvent) => {
//       const message = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     ws.onclose = () => {
//       console.log("Connection closed");
//     };

//     // ws.send = ()=>{

//     // }

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, [webSocketUrl, chatRoomId]);

//   const sendMessage = (message: string) => {
//     console.log("🙆‍♂️➡️➡️❤️: msg", message);
//     // if (socket && socket.readyState === WebSocket.OPEN) {
//     //   //stomp frame 작성
//     //   /* prettier-ignore */
//     //   const sendFrame = `SEND\ndestination:/send/${chatRoomId}\n\n${JSON.stringify({ text: message })}\x00`;
//     //   socket.send(sendFrame);
//     // }
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       const sendMsg = JSON.stringify({ chatRoomId, message });
//       socket.send(sendMsg);
//     }
//   };

//   return { messages, sendMessage };
// };

// export default useWebSocket;
