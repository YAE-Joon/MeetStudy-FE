import { Suspense } from "react";
import MainLoading from "@/app/loading";
import { Myaccount } from "@/app/myAccount/MyAccountPage";
import { MainNavBar } from "@/component/mainPage/mainClinentComponents";
import { OuterContainer } from "@/component/styled-components/Container";

export default function MyAccount() {
  return (
    <>
      <OuterContainer as="main">
        <MainNavBar />
        <Suspense fallback={<MainLoading />}>
          <Myaccount />
        </Suspense>
      </OuterContainer>
    </>
  );
}
