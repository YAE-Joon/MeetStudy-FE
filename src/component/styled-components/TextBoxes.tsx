"use client";

import React from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  FontSizeOptions,
  StyledComponentsProps,
  StyledProps,
} from "@/component/styled-components/styledProps";

/** common  */

const DesignTokenVarNames = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface StyledTextProps extends StyledComponentsProps {
  fontSize?: string | null;
}

interface TextProps {
  content: string;
  color?: string;
  fontSize?: keyof FontSizeOptions;
  htype?: 1 | 2 | 3 | 4 | 5 | 6;
}

/** styled */

/// Title ///

const StyledTitle = styled.h1<StyledProps>`
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

  @media only screen and (max-width: ${mobileWidth}) {
    font-size: var(${DesignTokenVarNames.fontSize.mobile.large});
  }
`;

/// Description ///

const StyledDesc = styled.p<StyledTextProps>`
  font-size: var(
    ${({ fontSize }) => {
      return fontSize ? fontSize : DesignTokenVarNames.fontSize.web.small;
    }}
  );
  color: var(
    ${({ color }) => {
      return color ? color : DesignTokenVarNames.colors.simple.blackbasic;
    }}
  );

  padding: 2rem 1rem 2rem 1rem;
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
}) => {
  const Tag = `h${htype}` as keyof JSX.IntrinsicElements; // htype에 따른 태그 결정
  return (
    <StyledTitle as={Tag} $color={color} $fontSize={fontSize}>
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
 * @param param0.fontSize: (선택) 제목 크기 | (기본): small | (xlarge, large, medium, small, xsmall 중 하나)
 * @returns
 */
export const Description: React.FC<TextProps> = ({
  content,
  color = null,
  fontSize = null,
  htype = null,
}) => {
  return (
    <StyledDesc color={color} fontSize={fontSize}>
      {content}
    </StyledDesc>
  );
};
