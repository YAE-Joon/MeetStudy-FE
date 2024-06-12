"use client";

import { ChangeEvent, useState, useEffect } from "react";
import dt from "@/lib/designToken/designTokens";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
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
import { StudyRoom, Category } from "@/types/StudyRoom";
import fetchDataBE from "@/lib/fetch";
import { apiPaths } from "@/config/api";
import getTokenByClient from "@/util/getTokenByClient";
import { Title, TitleWrapper } from "@/component/styled-components/TextBoxes";
import useFetch from "@/hooks/useFetch";

const { ButtonWrapper, PartContainerV, PageWrapper } = StyledAccounts;

const initValue = {
  title: "",
  description: "",
  createdDate: "",
  userCapacity: 0,
  category: { id: 0, name: "", description: "" },
  userStudyRooms: [],
};

export default function FormForNewStudyRoom({
  categoryList,
}: {
  categoryList: Category[];
}) {
  const [studyRoomInfo, setStudyRoomInfo] = useState<StudyRoom>(initValue);
  const tokens = dt.DesignTokenVarNames;

  const createNewStudyRoom = async (selectedData: StudyRoom) => {
    const { title, description, userCapacity, category } = selectedData;
    const categoryId = category.id;
    const newData = { title, description, userCapacity, categoryId };

    console.log("➡️➡️[스터디룸 생성] 시작합니다 |  newData: ", newData);
    try {
      const token = getTokenByClient();
      const response = await fetchDataBE(
        apiPaths.studyrooms.create,
        {
          method: "POST",
          body: JSON.stringify(newData),
        },
        token
      );

      const result = await response.json();
      alert("성공적으로 생성하였습니다.");
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
      if (studyRoomInfo) {
        createNewStudyRoom(studyRoomInfo);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = name === "userCapacity" ? parseInt(value) : value;
    setStudyRoomInfo({
      ...studyRoomInfo,
      [name]: parsedValue,
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categoryList.find(
      (category) => category.name === event.target.value
    );
    if (selectedCategory) {
      setStudyRoomInfo({
        ...studyRoomInfo,
        category: selectedCategory,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        marginTop: "10vh",
      }}
    >
      <PartContainerV>
        <TitleWrapper>
          <Title
            $htype={1}
            $fontSize={tokens.fontSize.web.large}
            $color={tokens.colors.simple.blackbasic}
          >
            새 스터디룸 생성
          </Title>
        </TitleWrapper>
        <PageWrapper>
          <BasicForm id="create-new-studyRoom">
            <BasicFieldRow>
              <BasicLabel>스터디룸 이름: </BasicLabel>
              <BasicInput
                type="text"
                name="title"
                placeholder="이름"
                value={studyRoomInfo.title}
                onChange={handleInputChange}
              />
            </BasicFieldRow>
            <BasicFieldRow>
              <BasicLabel>스터디룸 설명: </BasicLabel>
              <BasicInput
                type="text"
                name="description"
                placeholder="스터디룸 설명"
                value={studyRoomInfo.description}
                onChange={handleInputChange}
              />
            </BasicFieldRow>
            <BasicFieldRow>
              <BasicLabel>사용자 수용 인원: </BasicLabel>
              <BasicInput
                type="number"
                name="userCapacity"
                placeholder="0-30"
                value={studyRoomInfo.userCapacity ?? 0}
                onChange={handleInputChange}
              />
            </BasicFieldRow>
            <BasicFieldCol>
              <BasicFieldRow>
                <BasicLabel>카테고리: </BasicLabel>
                <BasicSelect
                  name="category"
                  value={studyRoomInfo.category.name || ""}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    선택하세요
                  </option>
                  {categoryList.map((category, idx) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </BasicSelect>
              </BasicFieldRow>
            </BasicFieldCol>
          </BasicForm>
          <ButtonWrapper>
            <SubmitButtons content={"생성 완료"} onClick={handleFormSubmit} />
            <PrimaryButton
              onClick={() => setStudyRoomInfo(initValue)}
              content={"초기화"}
            />
          </ButtonWrapper>
        </PageWrapper>
      </PartContainerV>
    </div>
  );
}
