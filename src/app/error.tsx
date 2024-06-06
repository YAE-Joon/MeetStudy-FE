"use client"; // Error components must be Client Components
import { useEffect } from "react";
import { Container } from "@/component/styled-components/Container";
import { Title, Description } from "@/component/styled-components/TextBoxes";
import { MdErrorOutline } from "react-icons/md";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`❌ 에러가 발생하였습니다! ${error}`);
  }, [error]);

  return (
    <Container>
      <Title
        htype={2}
        color={tokens.colors.simple.blackbasic}
        fontSize={tokens.fontSize.web.medium}
        content={"Error!"}
      />
      <MdErrorOutline
        style={{ color: `var(${tokens.colors.simple.invalidred})` }}
      />
      <Description
        color={tokens.colors.simple.invalidred}
        content={"오류가 발생했습니다. 관리자에게 문의해주세요."}
      />
      <PrimaryButton
        content={"다시 시도하기"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      />
      <p>{error.message}</p>
    </Container>
  );
}
