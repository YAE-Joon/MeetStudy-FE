// 현존 스터디룸 목록을 띄우는 화면
// 스터디룸 -> 카테고리별

import { OuterContainer } from "@/component/styled-components/Container";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import SearchPageContainer from "@/app/studyrooms/StudyRoomPage";
import fetchDataBE from "@/lib/fetch";
import { CategoriyOptions } from "@/lib/types";

let categories: CategoriyOptions[];
async function GetCategories() {
  const apiUrl = "/api/admin/categories ";
  try {
    const loadData = await fetchDataBE(apiUrl, true);
    categories = loadData;
  } catch (err) {
    new Error("알 수 없는 에러가 발생했습니다.");
  }
}

GetCategories();

function StudyRoomsIndexPage() {
  return (
    <OuterContainer>
      <SearchPageContainer categories={categories} />
    </OuterContainer>
  );
}

export default StudyRoomsIndexPage;
