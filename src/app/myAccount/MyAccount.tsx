"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { MyaccountProps, UserProfile } from "@/types/User";
import getAPIendPoint from "@/lib/settingUrl";

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

import { apiPaths } from "@/config/api";
import getTokenByClient from "@/util/getTokenByClient";

import useFetch from "@/hooks/useFetch";
import { Category } from "@/types/StudyRoom";

import StyledAccounts from "@/app/myAccount/myAccountClientComponents";

import fetchDataBE from "@/lib/fetch";
import { getUserInfoFromToken } from "@/util/getUserInfo";

const { FristSectionContainer, FirstSectionUl, ButtonWrapper, DeleteThisUser } =
  StyledAccounts;

const EditSections: React.FC<MyaccountProps> = ({ UserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [myUserInfo, setMyUserInfo] = useState<UserProfile | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<
    Category[] | null | undefined
  >(UserProfile.interests);

  // 이건 어디서 부르던 상관 없음
  const [categoryList, categoryErrors, categoryLoading] = useFetch<Category[]>(
    apiPaths.category.public,
    {}
  );

  useEffect(() => {
    //클라이언트에서 유저의 정보를 불러옴
    const loadData = async () => {
      try {
        const token = getTokenByClient();
        const data = await getUserInfoFromToken(token, [
          "email",
          "username",
          "nickname",
          "password",
          "interests",
        ]);
        setMyUserInfo(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("알 수 없는 에러가 발생했습니다."));
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setMyUserInfo(myUserInfo);
    }
  }, [isEditing]);

  // handlers //
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDeleteUser = () => {
    alert("정말 탈퇴하시겠습니까? / 이후 구현 예정");
  };
  const handleFormSubmit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
      if (myUserInfo) {
        updateUserInfo(myUserInfo);
      }
    }
    setIsEditing(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (myUserInfo) {
      setMyUserInfo({
        ...myUserInfo,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    if (selectedInterests) {
      const { value } = event.target;
      const newSelectedInterests = [...selectedInterests];
      // newSelectedInterests[idx].name = value; 체크 필요
      setSelectedInterests(newSelectedInterests);
      setMyUserInfo({
        ...myUserInfo,
        interests: newSelectedInterests,
      } as UserProfile);
    }
  };

  // Convert
  const interestLists: string[] = categoryList
    ? categoryList.map((category) => category.name)
    : [];

  //// fetching : update, delete /////

  const updateUserInfo = async (editedData: UserProfile) => {
    console.log("[🐸🐸🐸🐸 내 정보를 수정합니다!] ");
    console.log("[🐸🐸🐸🐸] 수정될 정보는?  editedData", editedData);
    const token = getTokenByClient();
    try {
      const response = await fetchDataBE(
        apiPaths.mypage.edit,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        },
        token
      );

      alert("성공적으로 수정하였습니다.");
    } catch (error) {
      console.error("❗Error:", error);
      alert(`❗수정 중 오류가 발생하였습니다! ${error}`);
    }
  };

  if (!myUserInfo) {
    console.log("userInfo? (3)", myUserInfo);
    return <h1>유저 정보 받기에 실패했습니다</h1>;
  }

  return (
    <FristSectionContainer>
      <FirstSectionUl>
        {!isEditing ? (
          <>
            <li>
              <span style={{ fontWeight: "bold" }}>이름</span>{" "}
              <span>{myUserInfo.username}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>닉네임</span>{" "}
              <span>{myUserInfo.nickname}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>비밀번호</span>{" "}
              <span>{"*".repeat(Math.min(myUserInfo.password.length, 6))}</span>
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>관심분야</span>{" "}
              {/* <span>
                {myUserInfo.interests.map((inter: string, idx) => (
                  <span key={idx}>{inter}</span>
                ))}
              </span> */}
            </li>
            <ButtonWrapper>
              <PrimaryButton onClick={handleEditClick} content={"수정하기"} />
            </ButtonWrapper>
            <div>
              <DeleteThisUser onClick={handleDeleteUser} content={"탈퇴하기"} />
            </div>
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
                  value={myUserInfo.username}
                  onChange={handleInputChange}
                />
              </BasicFieldRow>
              <BasicFieldRow>
                <BasicLabel>닉네임: </BasicLabel>
                <BasicInput
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  value={myUserInfo.nickname}
                  onChange={handleInputChange}
                />
              </BasicFieldRow>
              <BasicFieldRow>
                <BasicLabel>비밀번호: </BasicLabel>
                <BasicInput
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={myUserInfo.password}
                  onChange={handleInputChange}
                />
              </BasicFieldRow>
              <BasicFieldCol>
                <BasicFieldRow>
                  {/* {selectedInterests?.map((interest, idxSelected) => {
                    const newInterestLists = [interest, ...interestLists];
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
                        {newInterestLists.map((interDown, idx) => (
                          <option key={idx} value={interDown}>
                            {interDown}
                          </option>
                        ))}
                      </BasicSelect>
                    );
                  })} */}
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
