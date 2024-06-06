// 현존 스터디룸 목록을 띄우는 화면
// 스터디룸 -> 카테고리별
import fetchDataBE from "@/lib/fetch";
import { CategoriyOptions } from "@/lib/types";

import { OuterContainer } from "@/component/styled-components/Container";
import SearchPageContainer from "@/app/studyrooms/StudyRoomPage";

let categories: CategoriyOptions[];
// next.js의 서버에서 요청 보냄
async function GetCategories() {
  console.log("카테고리에서 API를 호출합니다");
  const apiUrl = "/api/admin/categories ";
  // const apiUrl = "/api/post";  // 테스트용, 공개된 api
  try {
    const loadData = await fetchDataBE(apiUrl, {}, true, true);
    categories = loadData;
    console.log("스터디룸 페이지에서 불러오는 카테고리 :", categories);
  } catch (err) {
    new Error("알 수 없는 에러가 발생했습니다.");
  }
}

GetCategories();

function StudyRoomsIndexPage() {
  return (
    <OuterContainer>
      {categories && <SearchPageContainer categories={categories} />}
    </OuterContainer>
  );
}

export default StudyRoomsIndexPage;
