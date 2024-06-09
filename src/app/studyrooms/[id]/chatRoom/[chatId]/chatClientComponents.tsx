// "use client";
// import { ChangeEvent } from "react";
// import ChatStyled from "@/app/studyrooms/[id]/chatRoom/[chatId]/chatStyled";

// const {
//   ChatRoomMain,
//   MessageContainer,
//   Message,
//   MessageAuthor,
//   MessageText,
//   Footer,
//   StyledTextarea,
//   Button,
// } = ChatStyled;
// /**
//  *
//  * @param newMessage
//  * @param onChange
//  * @param onClick
//  * @returns
//  */
// export const ChatTextArea = (newMessage: string, setNewMessage, onClick) => {
//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     // 입력한 새로운 메시지
//     setNewMessage(e.target.value);
//   };

//   return (
//     <>
//       {" "}
//       <Footer>
//         <StyledTextarea
//           placeholder="메세지를 입력하세요"
//           value={newMessage}
//           onChange={onChange}
//         />
//         <Button onClick={onClick}>보내기</Button>
//       </Footer>
//     </>
//   );
// };
