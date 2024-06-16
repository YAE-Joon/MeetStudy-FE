"use client";

import { ChangeEvent, useState } from "react";

import { apiPaths } from "@/config/api";
import fetchDataBE from "@/lib/fetch";

import { StudyRoom, StudyRoomMember, UserStudyRoom } from "@/types/StudyRoom";
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
import getTokenByClient from "@/util/getTokenByClient";
import { useRouter } from "next/navigation";

import StyledAdminUserPage from "@/app/admin/UserStyled";
import { processDateTime } from "@/util/dateUtilsFinal";
import { StyledStudyRoomsPack } from "@/component/mainPage/mainStyledComponents";
import { ChatRoomInfoProps } from "@/lib/types";
import useFetch from "@/hooks/useFetch";
const { MainTableWrapper } = StyledStudyRoomsPack;
const {
  Header,
  TableWrapper,
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableHead,
  StyledTableBody,
  StyledTableCell,
  Button,
  QuitButton,
} = StyledAdminUserPage;
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
    initialData.userStudyRooms ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const updateStudyRoom = async (updatedData: StudyRoom) => {
    //console.log("[스터디룸 관리자] 스터디룸 정보를 수정합니다: ");
    setLoading(true);
    setError(null);
    try {
      const token = getTokenByClient();

      const [response, error] = await fetchDataBE(
        apiPaths.studyrooms.update(roomId),
        {
          method: "POST",
          body: updatedData,
        },
        token
      );

      setFormData(response);
      alert("스터디룸 정보가 수정되었습니다.");
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

  const handleRemoveUser = async (id: number) => {
    const token = getTokenByClient();
    if (confirm("⚠️ 정말로 이 유저를 스터디룸에서 강퇴하겠습니까?")) {
      try {
        const response = await fetchDataBE(
          apiPaths.userStudyrooms.leave(id),
          {
            method: "DELETE",
          },
          token
        );
        // console.log("[스터디룸 관리자] response: ", response);
        setStudyRoomMembers((prevList) =>
          prevList.filter((member) => member.id !== id)
        );
        alert("📢: 회원 강퇴 완료!");
      } catch (err) {
        alert(`❌: 오류 발생 | ${err}`);
      }
    }
  };

  const handleRemoveStudyRoom = async (id: number) => {
    const token = getTokenByClient();
    if (confirm("⚠️ 정말로 스터디룸을 삭제하시겠습니까?")) {
      try {
        const response = await fetchDataBE(
          apiPaths.studyrooms.delete(id),
          {
            method: "DELETE",
          },
          token
        );
        console.log("[스터디룸 관리자] response: ", response);
        setStudyRoomMembers((prevList) =>
          prevList.filter((member) => member.id !== id)
        );
        alert("📢: 스터디룸 삭제 완료. 메인으로 이동합니다.");
        router.push("/");
      } catch (err) {
        alert(`❌: 오류 발생 | ${err}`);
      }
    }
  };

  const tableHeadList = ["No.", "역할", "이메일", "가입일", ""];

  return (
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
              value={formData.userCapacity || 4}
              onChange={handleChange}
            />
          </BasicFieldRow>
        </BasicForm>
        <BasicFieldCol>
          {studyRoomMembers.length === 0 ? (
            <>
              <p>스터디룸에 참가중인 인원이 존재하지 않습니다.</p>
            </>
          ) : (
            <>
              <MainTableWrapper>
                <StyledTable>
                  <StyledTableHeader>
                    <StyledTableRow>
                      {tableHeadList.map((head, idx) => (
                        <StyledTableHead key={idx}>{head}</StyledTableHead>
                      ))}
                    </StyledTableRow>
                  </StyledTableHeader>
                  <StyledTableBody>
                    {studyRoomMembers?.map((member, idx) => {
                      return (
                        <StyledTableRow key={member.id}>
                          <StyledTableCell>
                            {member.id || "NULL"}
                          </StyledTableCell>

                          <StyledTableCell>{member.permission}</StyledTableCell>
                          <StyledTableCell>
                            {member.user?.email}
                          </StyledTableCell>
                          <StyledTableCell>
                            {
                              processDateTime(member.joinDate || "")
                                .formattedDate
                            }
                          </StyledTableCell>
                          <StyledTableCell>
                            {member.permission === "OWNER" ? null : (
                              <QuitButton
                                style={{ width: "30px", height: "25px" }}
                                onClick={() => handleRemoveUser(member.id)}
                              >
                                강퇴
                              </QuitButton>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </StyledTableBody>
                </StyledTable>
              </MainTableWrapper>
            </>
          )}
        </BasicFieldCol>

        <ButtonWrapper>
          <SubmitButtons
            content={"스터디룸 삭제하기"}
            onClick={() => handleRemoveStudyRoom(roomId)}
          />
          <SubmitButtons content={"수정완료"} onClick={() => handleSubmit} />
        </ButtonWrapper>
      </FirstSectionUl>
    </FristSectionContainer>
  );
};

export default ManageStudyRoom;
