// import WebSocket, { WebSocketServer } from "ws";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server"
// /** websocket 관련 함수 */
// // 예비 함수 코드들로 client 와 backend간 어떻게 통신할 지 정해지면 사용할 수도 있고 아닐 수도 있는 코드들입니다.

// // 클라이언트에서 넥스트 서버로 요청을 보낼때 사용하는 매서드
// export async function POST(req: NextRequest) {
//     // WebSocket URL
//     const webSocketUrl = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws`;

//     console.log("👩‍💻 auth:websocket | init handshake request occurred..");

//     const token = req.headers.get("Authorization");
//     if (!token) {
//       console.log("👩‍💻 auth:websocket: token 상태가?", token);
//       return NextResponse.json({ status: "fail", message: "Token is missing" });
//     }

//     try {
//       const user = await JWTvalidation(webSocketUrl, token);
//       return NextResponse.json({ status: "success", user });
//     } catch (error) {
//       console.error("Token validation error:", error);
//       // Type narrowing
//       let errorMessage = "Unknown error occurred";
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       }

//       return NextResponse.json({ status: "fail", message: errorMessage });
//     }
//   }
// // http로 1회성 jwt 인증한다면 사용할 함수
// async function JWTvalidation(url: string, token: string) {
//   console.log("👩‍💻 auth:websocket | JWTvalidation...");
//   //Token validation error: TypeError: fetch failed
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log("response?", response);

//   if (!response.ok) {
//     console.log("요청이 거부되었습니다!: 토큰: ", token);
//     throw new Error("Token validation failed");
//   }

//   const responseData = await response.json();

//   if (responseData.httpStatus !== "OK") {
//     console.log(
//       "👩‍💻 auth:websocket | responseData.httpStatus",
//       responseData.httpStatus
//     );
//     throw new Error(responseData.data.errMsg || "Unknown error");
//   }

//   return responseData.data.user;
// }

// function eventDataJSONParser(event: WebSocket.MessageEvent) {
//   let data;

//   if (typeof event.data === "string") {
//     // 문자열일때
//     data = JSON.parse(event.data);
//   } else if (event.data instanceof ArrayBuffer) {
//     // fixed binary data buffer
//     const text = new TextDecoder().decode(new Uint8Array(event.data));
//     data = JSON.parse(text);
//   } else if (Array.isArray(event.data)) {
//     // binary data type, only used in node.js, not in browser
//     const buffers = event.data.map((buffer) => buffer.toString());
//     const text = buffers.join("");
//     data = JSON.parse(text);
//   } else {
//     throw new Error("websocket으로 출력할 수 없는 데이터 타입입니다!");
//   }
// }
