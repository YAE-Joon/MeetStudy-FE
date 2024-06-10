// 라우트 링크 세팅용
const routeLinks: RouteLinks = {
  landing: "/landing",
  main: "/",
  login: "",
  signUp: "/users/login",
  myAccountSetting: "/myAccount",
  studyRoomsList: "/studyrooms",
  studyRoomSample: "/studyrooms/1",
  studyRoomChatRooms: "/studyrooms/1/chatRoom",
  studyRoomChatRoomSample: "/studyrooms/1/chatRoom/1",
};

export default routeLinks;

interface RouteLinks {
  [key: string]: string;
}
