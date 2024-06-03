import { Myaccount } from "@/app/myAccount/MyAccountPage";
import MyAccountLoading from "@/app/myAccount/loading";
import Loading from "@/component/Loading/Loading";
import { MainNavBar } from "@/component/mainPage/MainComponents";
import { OuterContainer } from "@/component/styled-components/Container";
import getAPIendPoint from "@/lib/settingUrl";
import { Suspense } from "react";

export default async function MyAccount() {
  //let fetchedUserInfo = null
  // fetch data
  const apiEndpoint = getAPIendPoint(`/api/mypage`);
  const res = await fetch(apiEndpoint, {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const userData = await res.json();
  return (
    <>
      <OuterContainer as="main">
        <MainNavBar />
        <Suspense fallback={<Loading />}>
          <Myaccount userData={userData} />
        </Suspense>
      </OuterContainer>
    </>
  );
}
