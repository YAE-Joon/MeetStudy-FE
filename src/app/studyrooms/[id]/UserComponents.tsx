"use client";
import { useState } from "react";

import { apiPaths } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import fetchDataBE from "@/lib/fetch";

import Modal from "@/component/Modal";
import ModalContainer from "@/component/styled-components/Modal/ModalContainer";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/component/styled-components/Button/Buttons";
import { usePathname } from "next/navigation";
import { getRoomId } from "@/app/studyrooms/studyroomSub";
import { useRouter } from "next/navigation";
import getTokenByClient from "@/util/getTokenByClient";
import { useRoomId } from "@/hooks/useGetRoomId";

// 스터디룸 가입 버튼 { roomId }: { roomId: number }
export const JoinStudyRoom = () => {
  const [modalMessage, setModalMessage] =
    useState("본 스터디룸에 가입하시겠습니까?");
  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태
  const handleModalClose = () => setIsModalOpen(false);
  const [isDone, setIsDone] = useState(false);

  const roomId = useRoomId();

  const handleSignUp = async () => {
    try {
      const token = getTokenByClient();
      console.log("[스터디룸/가입하기] 토큰을 조회합니다.", token);
      const response = await fetchDataBE(
        apiPaths.userStudyrooms.join(roomId),
        {
          method: "POST",
        },
        token
      );
      console.log("[스터디룸] 성공적으로 가입하였습니다.", response);
      setModalMessage("성공적으로 가입하였습니다.");
      handleFinish();
      window.location.reload();
      /* 
      가입 성공시 isMemeber (layout -> MovingMenu-> this button)의 값을 바꾸어주려고, reload를 통해 layout에서 다시 fetch해와서 거기서 isMember를 다시 세팅한다. 혹은 router를 통해 studyroom/해당스터디룸번호로 보낸다던가 어느게 좋은지?
      */
    } catch (err) {
      console.error("Failed to join the study room", err);
      setModalMessage("가입 오류!");
    }
  };

  const handleFinish = () => setIsDone((prev) => !prev);

  return (
    <>
      <PrimaryButton
        content={"가입하기"}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal isVisible={isModalOpen} onClose={handleModalClose}>
        <ModalContainer
          mode="스터디룸 가입"
          buttonMessage="가입하기"
          modalMessage={modalMessage}
          onClick={() => {
            handleSignUp();
          }}
          isDone={isDone}
        />
      </Modal>
    </>
  );
};

// 스터디룸 떠나기 버튼
export const LeaveStudyRoom = () => {
  const [modalMessage, setModalMessage] =
    useState("스터디룸에서 떠나시겠습니까?");
  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태
  const handleModalClose = () => setIsModalOpen(false);
  const [isDone, setIsDone] = useState(false);

  const router = useRouter();
  const roomId = useRoomId();

  const handleSignOut = async () => {
    try {
      const token = getTokenByClient();
      console.log("[스터디룸/탈퇴하기] 토큰을 조회합니다.", token);
      const response = await fetchDataBE(
        apiPaths.userStudyrooms.leave(roomId),
        {
          method: "POST",
        },
        token
      );
      console.log("[스터디룸] 성공적으로 스터디룸을 떠났습니다.", response);
      setModalMessage("성공적으로 스터디룸을 떠났습니다.");
      handleFinish();
    } catch (err) {
      console.error("Failed to leave the study room", err);
      setModalMessage("탈퇴 오류!");
      setModalMessage("탈퇴 오류!");
    }
  };

  const handleFinish = () => router.push("/");
  //임시. 탈퇴 완료 후 메인 페이지로 리다이렉션.

  return (
    <>
      <SecondaryButton
        content={"탈퇴하기"}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal isVisible={isModalOpen} onClose={handleModalClose}>
        <ModalContainer
          mode="스터디룸 탈퇴"
          buttonMessage="탈퇴하기"
          modalMessage={modalMessage}
          onClick={() => {
            handleSignOut();
          }}
          isDone={isDone}
        />
      </Modal>
    </>
  );
};
