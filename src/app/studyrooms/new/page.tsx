"use client";
import getTokenByClient from "@/util/getTokenByClient";
import { apiPaths } from "@/config/api";
import FormForNewStudyRoom from "@/app/studyrooms/new/CreateNewRoom";
import { OuterContainer } from "@/component/styled-components/Container";
import useFetch from "@/hooks/useFetch";
import { Category } from "@/types/StudyRoom";
import Loading from "@/component/Loading/Loading";

export default function CreateNewStudyroomPage() {
  const [categories, setCategores] = useFetch<Category[]>(
    apiPaths.category.public,
    {}
  );
  return categories && categories.length > 0 ? (
    <OuterContainer $height="100vh">
      <FormForNewStudyRoom categoryList={categories} />
    </OuterContainer>
  ) : (
    <Loading />
  );
}
