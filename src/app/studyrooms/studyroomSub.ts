import { usePathname } from "next/navigation";
// room id 추출
// studyRooms 를 통해 들어오지 않는 경우를 대비(chatRoom 페이지에서 사용)
export function getRoomId() {
  const currPath = usePathname();
  const match = currPath.match(/\/studyrooms\/(\d+)\/?/);
  //const match = currPath.match(/\/studyrooms\/(\d+)\/chatRoom/);

  if (match && match[1]) {
    const roomId = parseInt(match[1], 10);
    console.log("현재 참가중인 방 아이디:", roomId);
    return roomId;
  } else {
    console.log("방 아이디를 찾을 수 없습니다.");
    return 0;
  }
}

export function getChatRoomId() {
  // 정규 표현식을 사용하여 경로의 마지막 숫자를 추출
  const currPath = usePathname();
  const match = currPath.match(/\/(\d+)(?!.*\/\d+)/);
  if (match) {
    const chatRoomId = parseInt(match[1], 10);
    //console.log("현재 참가중인 채팅방 아이디:", chatRoomId);
    return chatRoomId;
  }
  console.log("채팅방 아이디를 찾을 수 없습니다.");
  return 0;
}

export function extractRoomId(path: string): number | null {
  const match = path.match(/\/studyrooms\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// export function dataJSONParser(receivedData) {
//     let data;

//     if (typeof receivedData === "string") {
//       // 문자열일때
//       data = JSON.parse(receivedData);
//     } else if (receivedData instanceof ArrayBuffer) {
//       // fixed binary data buffer
//       const text = new TextDecoder().decode(new Uint8Array(receivedData));
//       data = JSON.parse(text);
//     } else if (Array.isArray(receivedData)) {
//       // binary data type, only used in node.js, not in browser
//       const buffers = receivedData.map((buffer) => buffer.toString());
//       const text = buffers.join("");
//       data = JSON.parse(text);
//     } else {
//       throw new Error("websocket으로 출력할 수 없는 데이터 타입입니다!");
//     }

//     return data;
//   }
