// import { ChatMessage } from "@/lib/types";
// import { useEffect, useState } from "react";
// //import { dataJSONParser } from "@/app/api/auth/route";

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
//     const ws = new WebSocket(webSocketUrl);
//     ws.onopen = () => {
//       console.log("🙆‍♂️➡️➡️❤️ : connected with backend server");
//       console.log(
//         "🙆‍♂️➡️➡️❤️ : custom Frmae을 사용해 header를 커스텀합니다. JSON 토큰을 전송합니다"
//       );

//       // custom header
//       const customFrame = `CONNECT\naccept-version:1.2\nhost:${process.env.NEXT_PUBLIC_WS_URL}\nAuthorization:${token}\n\n\x00`;

//       console.log("🙆‍♂️➡️➡️❤️ : 서버로 JSON 토큰을 전송합니다");
//       ws.send(customFrame);
//     };

//     ws.onmessage = (event: MessageEvent) => {
//       const message = event.data;

//       // 메시지의 형식에 따라 처리
//       if (message.startsWith("CONNECTED")) {
//         console.log("🙆‍♂️ : Connected to the WebSocket server");

//         // 구독 프레임을 작성
//         const subscribeFrame = `SUBSCRIBE\nid:sub-0\ndestination:/room/${chatRoomId}\n\n\x00`;
//         ws.send(subscribeFrame);
//       } else if (message.startsWith("ERROR")) {
//         console.error("Error received from server:", message);
//       } else {
//         try {
//           const data = JSON.parse(message);

//           // WebSocket에서 받은 JSON 형식의 메시지를 처리
//           let receivedMessage = data;
//           console.log("🙆‍♂️ | receivedMessage", receivedMessage);
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         } catch (error) {
//           console.error("Failed to parse JSON message:", message, error);
//         }
//       }
//     };

//     ws.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, [webSocketUrl, chatRoomId]);

//   const sendMessage = (message: string) => {
//     console.log("🙆‍♂️➡️➡️❤️: msg", message);
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       //stomp frame 작성
//       /* prettier-ignore */
//       const sendFrame = `SEND\ndestination:/send/${chatRoomId}\n\n${JSON.stringify({ text: message })}\x00`;
//       socket.send(sendFrame);
//     }
//   };

//   return { messages, sendMessage };
// };

// export default useWebSocket;
