"use client";
// 스터디룸 채팅방 생성 컴포넌트
import { useState, ChangeEvent, useEffect } from "react";

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
import { CreateChatRoomProps } from "@/types/Chatroom";

import {
  BasicInput,
  BasicForm,
  SubmitButtons,
  BasicFieldRow,
  BasicFieldCol,
  BasicLabel,
  BasicSelect,
} from "@/component/styled-components/Forms";
import StyledAccounts from "@/app/myAccount/myAccountClientComponents";

const { ButtonWrapper, SpanContainer } = StyledAccounts;

import StyledModal from "@/component/styled-components/Modal/ModalStyled";
const { ModalWrapper, Logo, Title, Divider } = StyledModal;

import { Description } from "@/component/styled-components/TextBoxes";
import getTokenByClient from "@/util/getTokenByClient";

// 스터디룸 가입 버튼 { roomId }: { roomId: number }
export const CreateChatRoom = ({ roomId }: { roomId: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태
  const handleModalClose = () => setIsModalOpen(false);

  const router = useRouter();

  const initValue = {
    title: "",
    studyRoomId: roomId,
    notice: "",
  };

  const [chatRoomSet, setChatRoomSet] =
    useState<CreateChatRoomProps>(initValue);

  const createNewChatRoom = async (newData: CreateChatRoomProps) => {
    console.log("➡️➡️[채팅방 생성] 시작합니다 |  newData: ", newData);
    try {
      const token = getTokenByClient();
      const response = await fetchDataBE(
        apiPaths.chatroom.create,
        {
          method: "POST",
          body: newData,
        },
        token
      );

      const result = response;
      alert(`성공적으로 생성하였습니다. ${result}`);
      setChatRoomSet(initValue);
      window.location.reload(); // chatroom num을 모름, 새로고침 함
    } catch (error) {
      console.error("❗Error:", error);
      alert(`❗생성 중 오류가 발생하였습니다!${error}`);
    }
  };

  const handleFormSubmit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
      if (chatRoomSet) {
        createNewChatRoom(chatRoomSet);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChatRoomSet({
      ...chatRoomSet,
      [name]: value,
    });
  };

  return (
    <span>
      <PrimaryButton
        content={"새 채팅방"}
        onClick={() => setIsModalOpen(true)}
      />
      {!isModalOpen ? null : (
        <div style={{ width: "100vw", height: "100vh" }}>
          <Modal isVisible={isModalOpen} onClose={handleModalClose}>
            <ModalWrapper>
              <Logo
                alt="로고 이미지"
                width={200}
                height={40}
                src="/images/large-logo.svg"
              />
              <Divider>
                <span></span>
              </Divider>
              <Title>채팅방 생성하기</Title>
              <Description content={"채팅방을 생성하시겠습니까?"} />

              <>
                <BasicForm id="create-new-studyRoom">
                  <BasicFieldRow>
                    <BasicLabel>채팅방 이름: </BasicLabel>
                    <BasicInput
                      type="text"
                      name="title"
                      placeholder="이름을 입력해주세요"
                      value={chatRoomSet.title}
                      onChange={handleInputChange}
                    />
                  </BasicFieldRow>
                  <BasicFieldRow>
                    <BasicLabel>채팅방 공지: </BasicLabel>
                    <BasicInput
                      type="text"
                      name="notice"
                      placeholder="채팅방의 공지사항을 입력해주세요"
                      value={chatRoomSet.notice}
                      onChange={handleInputChange}
                    />
                  </BasicFieldRow>
                </BasicForm>
                <ButtonWrapper>
                  <SubmitButtons
                    content={"생성 완료"}
                    onClick={handleFormSubmit}
                  />
                  <PrimaryButton
                    onClick={() => setChatRoomSet(initValue)}
                    content={"초기화"}
                  />
                </ButtonWrapper>
              </>
            </ModalWrapper>
          </Modal>
        </div>
      )}
    </span>
  );
};
