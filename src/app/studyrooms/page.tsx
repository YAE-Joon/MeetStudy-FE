import fetchDataBE from "@/lib/fetch";
import { CategoriyOptions } from "@/lib/types";
import { OuterContainer } from "@/component/styled-components/Container";
import { apiPaths } from "@/config/api";
import getTokenByServer from "@/util/getTokenByServer";
import StudyRoomPage from "@/app/studyrooms/StudyRoomPage";

async function GetCategories() {
  try {
    const token = getTokenByServer();
    //console.log("[스터디룸 목록] token?", token);
    const loadData = await fetchDataBE(apiPaths.category.public, {}, token);
    return { categories: loadData, error: null };
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "액세스 토큰을 가져오지 못했습니다: 쿠키가 없습니다"
    ) {
      throw new Error("로그인 상태가 아닙니다.");
    } else {
      throw new Error(
        `액세스 토큰을 가져오는 동안 예상치 못한 오류가 발생했습니다(3): ${
          (err as Error).message
        }`
      );
    }
  }
}

export default async function StudyRoomsIndexPage() {
  const { categories, error } = await GetCategories();
  if (error) {
    return (
      <OuterContainer $height="100vh">
        <div>오류가 발생했습니다: {error}</div>
      </OuterContainer>
    );
  }

  return (
    <OuterContainer $height="100vh">
      <StudyRoomPage categories={categories} />
    </OuterContainer>
  );
}
