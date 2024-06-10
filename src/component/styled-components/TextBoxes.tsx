"use client";

import React from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  FontSizeOptions,
  StyledProps,
} from "@/component/styled-components/styledProps";

/** common  */

const DesignTokenVarNames = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface StyledTextProps extends StyledProps {
  $align?: "center" | "left";
}

interface TextProps {
  content: string;
  color?: string;
  fontSize?: string; //token에서 지정되어 전달될 예정
  align?: "center" | "left";
  $htype?: 1 | 2 | 3 | 4 | 5 | 6;
  isAuthor?: boolean;
  isBold?: boolean;
  className?: string;
}

/** styled */

/// Title ///

const StyledTitle = styled.h1<StyledTextProps>`
  text-align: ${({ $align }) => $align || "center"};
  font-size: var(
    ${({ $fontSize }) => $fontSize || DesignTokenVarNames.fontSize.web.large}
  );
  color: var(
    ${({ $color }) => $color || DesignTokenVarNames.colors.simple.whitebg}
  );
  min-width: auto;
  padding: 1rem;
  overflow-wrap: break-word;
  word-break: keep-all;
  font-weight: bold;

  @media only screen and (max-width: ${mobileWidth}) {
    font-size: var(${DesignTokenVarNames.fontSize.mobile.large});
  }
`;

/// Description ///

const StyledDesc = styled.p<StyledTextProps>`
  display: flex;
  align-items: center;
  flex-shrink: 1;

  justify-content: ${({ $align }) => {
    return $align ? $align : "center";
  }};
  font-size: var(
    ${({ $fontSize }) => {
      return $fontSize ? $fontSize : DesignTokenVarNames.fontSize.web.small;
    }}
  );
  color: var(
    ${({ $color }) => {
      return $color ? $color : DesignTokenVarNames.colors.simple.blackbasic;
    }}
  );

  min-height: 4rem;

  overflow-wrap: break-word;
  word-break: keep-all;

  @media only screen and (max-width: ${mobileWidth}) {
    font-size: var(${DesignTokenVarNames.fontSize.mobile.small});
  }
`;

const StyledSpanOrCite = styled.span<StyledTextProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;

  text-align: ${({ $align }) => $align || "center"};
  font-size: var(
    ${({ $fontSize }) => {
      return $fontSize ? $fontSize : DesignTokenVarNames.fontSize.web.small;
    }}
  );
  color: var(
    ${({ $color }) => {
      return $color ? $color : DesignTokenVarNames.colors.simple.blackbasic;
    }}
  );

  ${({ $isBold }) =>
    $isBold
      ? `
      font-weight: bold;
      `
      : ""}

  // padding: 2rem 1rem 2rem 1rem;
  min-height: 4rem;

  overflow-wrap: break-word;
  word-break: keep-all;

  @media only screen and (max-width: ${mobileWidth}) {
    font-size: var(${DesignTokenVarNames.fontSize.mobile.small});
  }
`;
/** components  */

interface TitleProps {
  as?: keyof JSX.IntrinsicElements;
  $align?: "center" | "left";
  $fontSize?: string;
  $color?: string;
  $htype?: 1 | 2 | 3 | 4 | 5 | 6;
  $padding?: string;
  isAuthor?: boolean;
  isBold?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Title = styled.h1.attrs<TitleProps>(({ as, $htype }) => ({
  as: as || ($htype ? `h${$htype}` : "h1"),
}))<TitleProps>`
  text-align: ${({ $align }) => $align || "center"};
  font-size: ${({ $fontSize }) =>
    `var(${$fontSize || DesignTokenVarNames.fontSize.web.large})`};
  color: ${({ $color }) =>
    `var(${$color || DesignTokenVarNames.colors.simple.whitebg})`};
  min-width: auto;
  padding: ${({ $padding }) => $padding || "1rem"};
  overflow-wrap: break-word;
  word-break: keep-all;
  font-weight: bold;

  @media only screen and (max-width: ${mobileWidth}) {
    font-size: var(${DesignTokenVarNames.fontSize.mobile.large});
  }
`;
/// Description ///
/**
 * description(p) : 긴 내용을 서술하는 p 태그용 컴포넌트입니다.
 * @param param0
 * @param param0.content : (필수) 글 내용(텍스트)
 * @param param0.color: (선택) 글자 색상 | (기본): 검은색
 * @param param0.fontSize: (선택) 글자 크기 | (기본): small | (xlarge, large, medium, small, xsmall 중 하나)
 * @returns
 */
export const Description: React.FC<TextProps> = ({
  content,
  color = null,
  fontSize = null,
  $htype = null,
  align = "left",
  className,
}) => {
  return (
    <StyledDesc
      $color={color}
      $fontSize={fontSize}
      $align={align}
      className={className}
    >
      {content}
    </StyledDesc>
  );
};

/// span ///
/**
 * 짧은 내용을 서술 혹은 강조하는 span 태그용 컴포넌트
 * @param param0
 * @param param0.content : (필수) 글 내용(텍스트)
 * @param param0.color: (선택) 글자 색상 | (기본): 검은색
 * @param param0.fontSize: (선택) 글자 크기 | (기본): small | (xlarge, large, medium, small, xsmall 중 하나)
 * @returns
 */
export const Span: React.FC<TextProps> = ({
  content,
  color = null,
  fontSize = null,
  isAuthor = false,
  align,
  isBold,
  className,
}) => {
  const Tag = isAuthor ? "cite" : "span";

  return (
    <StyledSpanOrCite
      as={Tag}
      $color={color}
      $fontSize={fontSize}
      $align={align}
      $isBold={isBold}
      className={className}
    >
      {content}
    </StyledSpanOrCite>
  );
};
interface TitleWrapperProp {
  $bgColor?: string | null;
}
export const TitleWrapper = styled.div<TitleWrapperProp>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ $bgColor }) => $bgColor || "transparent"};
`;
