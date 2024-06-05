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
  htype?: 1 | 2 | 3 | 4 | 5 | 6;
  isAuthor?: boolean;
  isBold?: boolean;
  className?: string;
}

/** styled */

/// Title ///

const StyledTitle = styled.h1<StyledTextProps>`
  text-align: ${({ $align }) => {
    return $align ? $align : "center";
  }};

  font-size: var(
    ${({ $fontSize }) => {
      return $fontSize ? $fontSize : DesignTokenVarNames.fontSize.web.large;
    }}
  );
  color: var(
    ${({ $color }) => {
      return $color ? $color : DesignTokenVarNames.colors.simple.whitebg;
    }}
  );

  padding: 1rem 1rem 1rem 1rem;

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

/// Title ///

/**
 * Title component(h1) : 타이틀에 쓰이는 컴포넌트입니다.
 * @param param0.
 * @param param0.content : 제목 내용(텍스트)
 * @param param0.color: (선택) 제목 색상
 * @param param0.fontSize: (선택) 제목 크기 | (xlarge, large, medium, small, xsmall 중 하나)
 * @param param0.htype: (선택)제목의 HTML 태그 타입 | h1~h6 중 택1
 *
 * @returns
 */
export const Title: React.FC<TextProps> = ({
  content,
  color = null,
  fontSize = null,
  htype = 1,
  align,
  className,
}) => {
  const Tag = `h${htype}` as keyof JSX.IntrinsicElements; // htype에 따른 태그 결정
  return (
    <StyledTitle
      as={Tag}
      $color={color}
      $fontSize={fontSize}
      $align={align}
      className={className}
    >
      {content}
    </StyledTitle>
  );
};

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
  htype = null,
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
