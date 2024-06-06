"use client";

import useFetch from "@/hooks/useFetch";

import { OuterContainer } from "@/component/styled-components/Container";
const UserPage = () => {
  const [userData, error] = useFetch("/api/v1/test", {}, false, true);

  console.log("뭘까?", userData);
  return (
    <OuterContainer>
      <div>유저페이지입니다</div>
    </OuterContainer>
  );
};

export default UserPage;
