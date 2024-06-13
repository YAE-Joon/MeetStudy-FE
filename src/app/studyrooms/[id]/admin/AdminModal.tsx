"use client";
// not use!!!!
import { useState } from "react";

import Modal from "@/component/Modal";
import ModalContainer from "@/component/styled-components/Modal/ModalContainer";

import StyledAdmin from "@/app/studyrooms/[id]/admin/StyledAdmin";
const { MemberItem, RemoveButton } = StyledAdmin;

interface QuitUserProps {
  userId: number;
  handleRemove: (userId: number) => void;
}
// 스터디룸 회원 제거 버튼
export const QuitUser = ({ userId, handleRemove }: QuitUserProps) => {
  const [modalMessage, setModalMessage] = useState(
    "유저를 스터디룸에서 강퇴시키겠습니까?"
  );
  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태
  const handleModalClose = () => setIsModalOpen(false);
  const [isDone, setIsDone] = useState(false);

  const handleQuitUser = async () => {
    try {
      //   const response = await fetchDataBE(apiPaths.userStudyrooms.leave(roomId), {
      //     method: "DELETE",
      //   });
      const response = handleRemove(userId);
      console.log("[스터디룸] 성공적으로 스터디룸을 떠났습니다.", response);
      setModalMessage("성공적으로 유저를 강퇴시켰습니다.");
      handleFinish();
    } catch (err) {
      console.error("Failed to quit user!", err);
      setModalMessage("강퇴 오류!");
      setModalMessage("강퇴 오류!");
    }
  };

  const handleFinish = () => setIsDone((prev) => !prev);

  return (
    <>
      <RemoveButton type="button" onClick={() => setIsModalOpen(true)}>
        유저 삭제
      </RemoveButton>
      <Modal isVisible={isModalOpen} onClose={handleModalClose}>
        <ModalContainer
          mode="유저 관리"
          buttonMessage="삭제하기"
          modalMessage={modalMessage}
          onClick={() => {
            handleQuitUser();
          }}
          isDone={isDone}
        />
      </Modal>
    </>
  );
};
