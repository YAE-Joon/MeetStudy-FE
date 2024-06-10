"use client";
import StyledModal from "@/component/styled-components/Modal/ModalStyled";
const { ModalWrapper, Logo, Title, Divider } = StyledModal;

import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
import { Description } from "@/component/styled-components/TextBoxes";

interface StudyRoomModalProps {
  mode: string;
  buttonMessage: string;
  modalMessage: string;
  isDone: boolean;
  onClick: () => void;
}

const ModalContainer = ({
  mode,
  onClick,
  buttonMessage,
  modalMessage,
  isDone,
}: StudyRoomModalProps) => {
  return (
    <>
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
        <Title>{mode}</Title>
        <Description content={modalMessage} />
        {!isDone && <PrimaryButton content={buttonMessage} onClick={onClick} />}
      </ModalWrapper>
    </>
  );
};

export default ModalContainer;
