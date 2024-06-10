// // connect with next.js server

// import { ChatMessage } from "@/lib/types";
// import { useEffect, useState } from "react";
// import { dataJSONParser } from "@/app/api/auth/route";

// //🙆‍♂️ 클라이언트
// //❤️ next 서버
// //🙆 백엔드 서버
// // client - next.js 🙆‍♂️➡️➡️❤️
// const useWebSocket = (url: string) => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   // Authorization
//   const userToken = process.env.NEXT_PUBLIC_TEST_TOKEN;
//   const token = `Bearer ${userToken}`;

//   // WebSocket URL
//   //const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;

//   useEffect(() => {
//     //초기 인증하기
//     //일단 백엔드의 proxy 서버와 통신

//     // websocket API in client
//     const ws = new WebSocket("http://localhost:8080");
//     ws.onopen = () => {
//       console.log("🙆‍♂️➡️➡️❤️ : connected with proxy server");
//       console.log("🙆‍♂️➡️➡️❤️ : 프록시 서버로 JSON 토큰을 전송합니다");
//       ws.send(JSON.stringify({ type: "auth", token }));
//     };

//     //🙆‍♂️ : "pong 들을 준비 완료"
//     ws.onmessage = (event: MessageEvent) => {
//       const data = JSON.parse(event.data);

//       if (data.type === "pong") {
//         console.log("❤️➡️➡️🙆‍♂️| 서버에서 'pong'을 받았어요");
//         return;
//       }
//       // poing을 듣고 있지 않을 때
//       let receivedMessage = dataJSONParser(data);
//       console.log("🙆‍♂️ | receivedMessage", receivedMessage);
//       setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//     };

//     ws.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     setSocket(ws);

//     const pingInterval = window.setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "ping" }));
//         console.log("Ping sent to server");
//       }
//     }, 30000);

//     return () => {
//       clearInterval(pingInterval);
//       ws.close();
//     };
//   }, [url]);

//   const sendMessage = (message: string) => {
//     console.log("🙆‍♂️➡️➡️❤️: msg", message);
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(message);
//     }
//   };

//   return { messages, sendMessage };
// };

// export default useWebSocket;
