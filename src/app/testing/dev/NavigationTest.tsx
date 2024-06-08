"use client";
import useFetch from "@/hooks/useFetch";
import getAPIendPoint from "@/lib/settingUrl";
import Link from "next/link";
import routeLinks from "@/lib/routeLinks";
import { PrimaryButton } from "@/component/styled-components/Button/Buttons";
import { FlexBoxV } from "@/component/styled-components/FlexBoxes";
const TESTNavigatios = () => {
  return (
    <div>
      <h1>페이지 테스트 구간</h1>
      <FlexBoxV>
        {Object.keys(routeLinks).map((key) => (
          <div key={key}>
            <PrimaryButton href={routeLinks[key]} content={key} />
          </div>
        ))}
      </FlexBoxV>
    </div>
  );
};

export default TESTNavigatios;
