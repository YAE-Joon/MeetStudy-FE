// import { NextApiRequest, NextApiResponse } from "next";
// import fetchDataBE from "@/lib/fetch";
// import { NextRequest, NextResponse } from "next/server";
// import WebSocket from "ws";
// import { ChatMessage } from "@/lib/types";

// //🙆‍♂️ 클라이언트
// //❤️ next 서버
// //🙆 백엔드 서버

// //
// interface ExtWebSocket extends WebSocket {
//   isAlive: boolean;
// }

// interface DataFromClient {
//   token: string;
//   chatData: ChatMessage;
// }

// ////////** Backend 서버와 통신하는 next.js의 서버  */////////////
// const proxyWss = new WebSocket.Server({
//   port: 8080,
// });

// // 새로운 연결이 들어왔을 때 처리하는 함수
// proxyWss.on("connection", function connection(ws: WebSocket) {
//   console.log("🙆‍♂️➡️➡️❤️: 연결되었습니다.");
//   const extWs = ws as ExtWebSocket; // as로 타입 확장
//   extWs.isAlive = true;
//   ws.on("error", console.error);
//   ws.on("pong", function heartBeat() {
//     // pong, 하고 들어오면 처리할 함수, 즉 pong에 대한 이벤트 헨들러
//     extWs.isAlive = true;
//   });

//   ws.on("message", function message(data) {
//     console.log("[🙆‍♂️➡️➡️❤️] 받은 데이터: %s", data);

//     // try{
//     //     const receivedData = dataJSONParser(data)
//     //     const {token, chatData} = receivedData

//     // }
//   });
//   ws.send("something", function (err) {
//     console.log("[🙆‍♂️➡️➡️❤️]에러가 났어요!: %s", err?.message);
//     console.error(err);
//   });
// });

// // 주기적으로 연결을 확인하는 함수
// const interval = setInterval(function ping() {
//   proxyWss.clients.forEach(function each(ws: WebSocket) {
//     const extWs = ws as ExtWebSocket; // as로 타입 확장
//     if (extWs.isAlive === false) return extWs.terminate();

//     extWs.isAlive = false;
//     extWs.ping();
//   });
// }, 30000);

// proxyWss.on("close", () => {
//   clearInterval(interval);
// });

// // 클라이언트와 백엔드 서버 사이에서
// // jwt 를 검증하고 두 개의 websocket을 중계하는 코드
// async function webSocketProxy(url: string, token: string) {
//   console.log("👩‍💻 auth:websocket | JWTvalidation...");
//   // 백엔드 서버와 직접 통신하는 웹소켓
//   const serverWs = new WebSocket(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   serverWs.onopen = () => {
//     console.log("❤️🙆 | onopen: 연결되었습니다!");
//     serverWs.send("hi!");
//   };

//   serverWs.onmessage = (event: WebSocket.MessageEvent) => {
//     console.log("❤️🙆 | onmessage: 여기에 뭐라고쓰는게 좋아?");
//     let receivedMessage = dataJSONParser(event.data);
//     console.log("백엔드 서버에서 받은 메시지입니다:", receivedMessage);
//   };

//   //console.log("serverWs | ", serverWs);

//   // console.log("response?", response);

//   //   if (!response.ok) {
//   //     console.log("요청이 거부되었습니다!: 토큰: ", token);
//   //     throw new Error("Token validation failed");
//   //   }

//   //   const responseData = await response.json();

//   //   if (responseData.httpStatus !== "OK") {
//   //     console.log(
//   //       "👩‍💻 auth:websocket | responseData.httpStatus",
//   //       responseData.httpStatus
//   //     );
//   //     throw new Error(responseData.data.errMsg || "Unknown error");
//   //   }

//   //   return responseData.data.user;
// }

// // export async function POST(req: NextRequest){

// // }
// /** functions */

// export function dataJSONParser(receivedData: WebSocket.Data) {
//   let data;

//   if (typeof receivedData === "string") {
//     // 문자열일때
//     data = JSON.parse(receivedData);
//   } else if (receivedData instanceof ArrayBuffer) {
//     // fixed binary data buffer
//     const text = new TextDecoder().decode(new Uint8Array(receivedData));
//     data = JSON.parse(text);
//   } else if (Array.isArray(receivedData)) {
//     // binary data type, only used in node.js, not in browser
//     const buffers = receivedData.map((buffer) => buffer.toString());
//     const text = buffers.join("");
//     data = JSON.parse(text);
//   } else {
//     throw new Error("websocket으로 출력할 수 없는 데이터 타입입니다!");
//   }

//   return data;
// }
