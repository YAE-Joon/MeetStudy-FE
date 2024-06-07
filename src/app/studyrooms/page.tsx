// 현존 스터디룸 목록을 띄우는 화면
// 스터디룸 -> 카테고리별
import fetchDataBE from "@/lib/fetch";
import { CategoriyOptions } from "@/lib/types";

import { OuterContainer } from "@/component/styled-components/Container";
import SearchPageContainer from "@/app/studyrooms/StudyRoomPage";
import { apiPaths } from "@/config/api";

let categories: CategoriyOptions[];

async function GetCategories() {
  // studyrooms 페이지에 진입 시 서버에서 카테고리 정보를 불러옵니다.
  //console.log("studyrooms에서 카테고리 API를 호출합니다");

  try {
    const loadData = await fetchDataBE(
      apiPaths.category.public,
      {},
      false, //관리자 아님
      false
    );
    categories = loadData;
    //console.log("스터디룸 페이지에서 불러오는 카테고리 :", categories);
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
