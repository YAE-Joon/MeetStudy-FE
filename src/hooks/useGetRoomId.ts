import { usePathname } from "next/navigation";

export function useRoomId() {
  const currPath = usePathname();
  const match = currPath.match(/\/studyrooms\/(\d+)\/?/);

  if (match && match[1]) {
    const roomId = parseInt(match[1], 10);
    //console.log("현재 참가중인 방 아이디:", roomId);
    return roomId;
  } else {
    console.log("방 아이디를 찾을 수 없습니다.");
    return 0;
  }
}
