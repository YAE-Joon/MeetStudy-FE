"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserFromToken } from "@/util/getUserFromToken";
import getTokenByClient from "@/util/getTokenByClient";

import { Container } from "@/component/styled-components/Container";
import { MainNavBar } from "@/component/mainPage/mainClinentComponents";
import MainStyledPack from "@/component/mainPage/mainStyledComponents";
import dt from "@/lib/designToken/designTokens";

import MyCalendar from "@/component/mainPage/mainCalendarComponent";
import MyStudyRooms from "@/component/mainPage/mainMyStudyRoomsComponent";

const tokens = dt.DesignTokenVarNames;

const {
  PartContainerV,

  MainWrapper,
} = MainStyledPack;

const MainPage = () => {
  const { data, status } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false); //관리자 리다이렉트용
  const router = useRouter();

  useEffect(() => {
    const token = getTokenByClient();
    const userInfo = getUserFromToken(token);
    if (userInfo && userInfo?.auth === "ADMIN") {
      setIsRedirecting(true);
      alert("관리자 페이지로 이동합니다.");
      router.push("/admin");
    }

    const alertMessage = Cookies.get("alertMessage");
    //console.log("alertMessage?", alertMessage);
    if (alertMessage) {
      alert(alertMessage);
      Cookies.remove("alertMessage");
    }
  }, []);

  //isRedirecting 로 관리하는데도 하위 컴포넌트들이 자꾸 데이터 패칭을 하려고 한다..!!!
  return (
    <>
      {!isRedirecting && <MainNavBar mode={"mypage"} />}
      <Container $bgColor={`${tokens.colors.simple.primary}`} $height={"100vh"}>
        {!isRedirecting && (
          <MainWrapper>
            <PartContainerV>
              <MyCalendar />
            </PartContainerV>
            <PartContainerV>
              <MyStudyRooms />
            </PartContainerV>
          </MainWrapper>
        )}
      </Container>
    </>
  );
};

export default MainPage;
