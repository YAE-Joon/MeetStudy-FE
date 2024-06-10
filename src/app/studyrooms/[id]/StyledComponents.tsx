"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import { FlexBoxH } from "@/component/styled-components/FlexBoxes";

const mobileWidth = dt.DesignTokenExcept.media.mobile;

export const InnerContainer = styled(FlexBoxH)`
  align-items: flex-start;
  height: 100vh;

  //margin-top: 0.5rem;
  > *:first-child {
    flex: 3 0 20%;
    max-width: 20%;
  }

  > *:last-child {
    flex: 7 0 70%;
  }

  @media only screen and (max-width: ${mobileWidth}) {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    > *:first-child {
      width: 100%;
      height: 20%;
      max-width: none;
      margin-bottom: 1rem;
      /* flex-grow: 2;
      max-width: 20%;
      height: 100vh;
      overflow: auto; */

      height: auto;
    }

    > *:last-child {
      width: 100%;
      height: 80%;
      max-width: none;
    }
  }
`;
