"use client";

import styled from "styled-components";
import {
  StyledComponentsProps,
  StyledProps,
} from "@/component/styled-components/styledProps";
import dt from "@/lib/designToken/designTokens";
const mobileWidth = dt.DesignTokenExcept.media.mobile;

/** styled */
interface StyledDiv extends StyledProps {
  $position: "relative" | "fixed" | "absolute";
  $width: string;
  $height: string;
}

const StyledImageWrapper = styled.div<StyledDiv>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  position: ${(props) => props.$position};
`;

const StyledImageContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  //height: 100%;

  overflow: hidden;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    height: auto;
    display: none;
  }
`;

/** components */

interface ImageContainerProps extends StyledComponentsProps {
  position: "relative" | "fixed" | "absolute";
  width: string;
  height: string;
}
/**
 *
 * 이미지의 크기를 고정하기 위한 컴포넌트입니다.
 *  Next.js의 Image 태그에 fill 옵션을 사용할 때 쓰입니다.
 *
 */
export const ImageWrapper: React.FC<ImageContainerProps> = ({
  children,
  position,
  width,
  height,
}) => {
  return (
    <StyledImageWrapper $position={position} $width={width} $height={height}>
      {children}
    </StyledImageWrapper>
  );
};
/**
 * 이미지 컨테이너입니다. wrapper를 감쌉니다. 중앙정렬을 위한 div입니다.
 *  넘칠 시 hidden 합니다.
 */
export const ImageContainer: React.FC<StyledComponentsProps> = ({
  children,
}) => {
  return <StyledImageContainer>{children}</StyledImageContainer>;
};
