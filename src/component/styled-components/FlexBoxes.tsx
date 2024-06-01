"use client";

import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
const mobileWidth = dt.DesignTokenExcept.media.mobile;

export const FlexBox_H_2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  gap: 0.5rem;

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;

    position: relative;
  }

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

export const FlexBox_v_2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  gap: 5rem;

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;
  }

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;

export const FlexBox_H_ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 2vh;

  gap: 0.5rem;

  list-style-type: none;

  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
    align-items: center;
  }

  > div,
  > section {
    flex: 1 1 45%;
    min-width: 45%;
  }
`;
