"use client";
import { ChangeEvent, useState, useEffect } from "react";
import {
  FristSectionContainer,
  FirstSectionUl,
  ButtonWrapper,
} from "@/app/myAccount/myAccountComponents";
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
import { MyaccountProps, UserData } from "@/lib/types";
import getAPIendPoint from "@/lib/settingUrl";

const categoryList = ["국어", "영어", "수학", "과학", "사회", "정보와컴퓨터"];

const EditSections: React.FC<MyaccountProps> = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserData | null>(userData);

  const [selectedInterests, setSelectedInterests] = useState<
    string[] | null | undefined
  >(userData.interests);
  const [interestLists, setInterestLists] = useState<string[]>(categoryList);

  /////// handlers //////////
  const handleEditClick = () => {
    console.log("현재 isEditing", isEditing);
    console.log("바뀔 isEditing", !isEditing);
    setIsEditing((prv) => !prv);
  };

  const updateUserInfo = async (editedData: UserData) => {
    console.log("🙆‍♂️ Try update(upt) Data from MyAccount(CC): ");
    const { username, nickname, password, interests } = editedData;
    const apiEndpoint = getAPIendPoint(`/api/mypage`);
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, nickname, password, interests }),
      });

      if (!response.ok) {
        throw new Error("❌ 데이터 수정에 실패하였습니다.");
      }

      const result = await response.json();
      alert("성공적으로 수정하였습니다.");
    } catch (error) {
      console.error("❗Error:", error);
      alert(`❗수정 중 오류가 발생하였습니다!${error}`);
    }
  };
  const handleFormSubmit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
      if (userInfo) {
        updateUserInfo(userInfo);
      }
    }

    setIsEditing(false);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    if (selectedInterests) {
      console.log("event.target.value", event.target.value);
      const { value } = event.target;

      const newSelectedInterests = [...selectedInterests];
      newSelectedInterests[idx] = value;

      setSelectedInterests(newSelectedInterests);

      const updatedUserInfo = {
        ...userInfo,
        interests: newSelectedInterests,
      };
      setUserInfo(updatedUserInfo as UserData);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setUserInfo(userInfo);
    }
  }, [isEditing]);

  if (!userInfo) {
    console.log("userInfo? (3)", userInfo);
    return <h1>유저 정보 받기에 실패했습니다</h1>;
  }
  return (
    <FristSectionContainer>
      <FirstSectionUl>
        {!isEditing ? (
          <>
            <li>
              <span style={{ fontWeight: "bold" }}>이름</span>{" "}
              <span>{userInfo.username}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>닉네임</span>{" "}
              <span>{userInfo.nickname}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>비밀번호</span>{" "}
              <span>{"*".repeat(userInfo.password.length)}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>관심분야</span>{" "}
              <span>
                {userInfo.interests.map((inter, idx) => (
                  <span key={idx}>{inter}</span>
                ))}
              </span>
            </li>

            <ButtonWrapper>
              <PrimaryButton onClick={handleEditClick} content={"수정하기"} />
            </ButtonWrapper>
          </>
        ) : (
          <>
            <BasicForm id="edit-user-info">
              <BasicFieldRow>
                <BasicLabel>이름: </BasicLabel>
                <BasicInput
                  type="text"
                  name="username"
                  placeholder="이름"
                  value={userInfo.username}
                  onChange={handleInputChange}
                />
              </BasicFieldRow>
              <BasicFieldRow>
                <BasicLabel>닉네임: </BasicLabel>
                <BasicInput
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  value={userInfo.nickname}
                  onChange={handleInputChange}
                />
              </BasicFieldRow>
              <BasicFieldRow>
                <BasicLabel>비밀번호: </BasicLabel>
                <BasicInput
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={userInfo.password}
                  onChange={handleInputChange}
                />
              </BasicFieldRow>
              <BasicFieldCol>
                <BasicFieldRow>
                  {selectedInterests?.map((interest, idxSelected) => {
                    const temp = [];
                    temp.push(interest);
                    const newInterestLists = temp.concat(interestLists);
                    return (
                      <BasicSelect
                        key={idxSelected}
                        name="interests"
                        id={`interests-${idxSelected}`}
                        onChange={(event) =>
                          handleSelectChange(event, idxSelected)
                        }
                        value={interest}
                      >
                        {newInterestLists.map((interDonw, idx) => {
                          return (
                            <option key={idx} value={interDonw}>
                              {interDonw}
                            </option>
                          );
                        })}
                      </BasicSelect>
                    );
                  })}
                </BasicFieldRow>
              </BasicFieldCol>
            </BasicForm>
            <ButtonWrapper>
              <SubmitButtons content={"수정완료"} onClick={handleFormSubmit} />
              <PrimaryButton onClick={handleEditClick} content={"수정 취소"} />
            </ButtonWrapper>
          </>
        )}
      </FirstSectionUl>
    </FristSectionContainer>
  );
};

export default EditSections;
