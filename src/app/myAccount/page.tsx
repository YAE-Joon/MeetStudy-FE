import { Suspense } from "react";
import MainLoading from "@/app/loading";
import { Myaccount } from "@/app/myAccount/MyAccountPage";
import { MainNavBar } from "@/component/mainPage/mainClinentComponents";
import { OuterContainer } from "@/component/styled-components/Container";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;

export default function MyAccount() {
  return (
    <>
      <OuterContainer as="main" $bgColor={`${tokens.colors.simple.whitebg}`}>
        <MainNavBar />
        <Suspense fallback={<MainLoading />}>
          <Myaccount />
        </Suspense>
      </OuterContainer>
    </>
  );
}
