"use client";

import { ChangeEvent, useState } from "react";

import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";

import { StudyRoom, UserStudyRoom } from "@/types/StudyRoom";
import {
  BasicInput,
  BasicForm,
  SubmitButtons,
  BasicFieldRow,
  BasicFieldCol,
  BasicLabel,
} from "@/component/styled-components/Forms";
import StyledAdmin from "@/app/studyrooms/[id]/admin/StyledAdmin";
import StyledAccounts from "@/app/myAccount/myAccountClientComponents";
import { QuitUser } from "@/app/studyrooms/[id]/admin/AdminModal";
import Loading from "@/component/Loading/Loading";

const { FristSectionContainer, FirstSectionUl, ButtonWrapper, DeleteThisUser } =
  StyledAccounts;
const { MemberItem, RemoveButton } = StyledAdmin;

interface EditDataProps {
  initialData: StudyRoom;
  roomId: number;
}

const ManageStudyRoom = ({ initialData, roomId }: EditDataProps) => {
  const [formData, setFormData] = useState(initialData); //객체로 담김김
  const [studyRoomMembers, setStudyRoomMembers] = useState<UserStudyRoom[]>(
    initialData.userStudyRooms
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStudyRoom = async (updatedData: StudyRoom) => {
    console.log("🙆‍♂️ 스터디룸 정보를 수정합니다: ");
    setLoading(true);
    setError(null);
    try {
      // 임시
      const [response, error] = await fetchDataBE(
        apiPaths.studyrooms.update(roomId),
        {
          method: "POST",
          body: updatedData,
        },
        true
      );
      if (error) {
        throw error;
      }
      if (response) {
        setFormData(response);
      }
      console.log("[스터디룸/관리자] response, error", response, error);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("[스터디룸/관리자] 예상치 못한 에러가 발생하였습니다");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
      if (formData) {
        updateStudyRoom(formData);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRemove = (id: number) => {
    console.log("handleRemove가 실행됨");
    setStudyRoomMembers((prevList) =>
      prevList.filter((member) => member.id !== id)
    );
    alert("회원 강퇴 완료!(임시)");
  };

  if (!initialData) {
    console.log("스터디룸 정보 불러오기 실패", initialData);
    return <h1>스터디룸 정보를 정보를 불러오지 못했습니다</h1>;
  }

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <FristSectionContainer>
      <FirstSectionUl>
        <BasicForm id="edit-study-room-form">
          <BasicFieldRow>
            <BasicLabel>스터디룸 이름: </BasicLabel>
            <BasicInput
              type="text"
              name="title"
              placeholder="스터디룸 이름"
              value={formData.title}
              onChange={handleChange}
            />
          </BasicFieldRow>
          <BasicFieldRow>
            <BasicLabel>스터디룸 설명: </BasicLabel>
            <BasicInput
              type="text"
              name="description"
              placeholder="스터디룸 설명"
              value={formData.description}
              onChange={handleChange}
            />
          </BasicFieldRow>
          <BasicFieldRow>
            <BasicLabel>최대인원: </BasicLabel>
            <BasicInput
              type="number"
              name="maxCapacity"
              placeholder="스터디룸 최대인원"
              value={formData.maxCapacity}
              onChange={handleChange}
            />
          </BasicFieldRow>
          <BasicFieldCol>
            <BasicFieldRow>
              {studyRoomMembers?.map((member, idx) => {
                return (
                  <MemberItem key={member.id}>
                    <p>No: {member.id}</p> |<p>{member.permission}</p> |
                    <p>email: {member.user.email}</p>
                    <QuitUser userId={member.id} handleRemove={handleRemove} />
                  </MemberItem>
                );
              })}
            </BasicFieldRow>
          </BasicFieldCol>
        </BasicForm>
        <ButtonWrapper>
          <SubmitButtons content={"수정완료"} onClick={handleSubmit} />
        </ButtonWrapper>
      </FirstSectionUl>
    </FristSectionContainer>
  );
};

export default ManageStudyRoom;
