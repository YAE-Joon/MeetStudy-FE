import fetchDataBE from "@/lib/fetch";
import { CategoriyOptions } from "@/lib/types";
import { OuterContainer } from "@/component/styled-components/Container";
import { apiPaths } from "@/config/api";
import getTokenByServer from "@/util/getTokenByServer";
import StudyRoomPage from "@/app/studyrooms/StudyRoomPage";

export default async function StudyRoomsIndexPage() {
  return (
    <OuterContainer $height="100vh">
      <StudyRoomPage />
    </OuterContainer>
  );
}
