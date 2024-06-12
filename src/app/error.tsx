"use client"; // Error components must be Client Components
import { useEffect } from "react";
import { OuterContainer } from "@/component/styled-components/Container";
import { Title, Description } from "@/component/styled-components/TextBoxes";
import { MdErrorOutline } from "react-icons/md";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/component/styled-components/Button/Buttons";
import dt from "@/lib/designToken/designTokens";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
const tokens = dt.DesignTokenVarNames;

export default function Error({
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
    <div style={{ height: "100vh" }}>
      <OuterContainer $height={"80%"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FlexBoxV>
            <Title
              $htype={2}
              $color={tokens.colors.simple.blackbasic}
              $fontSize={tokens.fontSize.web.large}
            >
              Error!
            </Title>
            <MdErrorOutline
              style={{
                color: `var(${tokens.colors.simple.invalidred})`,
                fontSize: "5rem",
              }}
            />
            <Description
              color={tokens.colors.simple.invalidred}
              content={"오류가 발생했습니다. 관리자에게 문의해주세요."}
            />
            <p>{error.message}</p>
            <div style={{ width: "40%", height: "20%" }}>
              <PrimaryButton
                content={"다시 시도하기"}
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
              />
              <SecondaryButton href={"/"} content={"메인으로 돌아가기"} />
            </div>
          </FlexBoxV>
        </div>
      </OuterContainer>
    </div>
  );
}
