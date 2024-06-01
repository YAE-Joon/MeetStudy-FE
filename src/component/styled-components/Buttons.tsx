"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  StyledComponentsProps,
  StyledProps,
} from "@/component/styled-components/styledProps";

/** common */
const DesignTokenVarNames = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface StyledButtonProps extends StyledProps {
  $color: string | null;
  $secondaryColor?: string | null;
  $bgColor: string | null; //primary
  $borderColor?: string | null;
}

interface ButtonProps extends StyledComponentsProps {
  href?: string | null;
}
/** styled  */
/**
 * $color: [필수] 글자색
 * $bgColor : [필수] 배경색, primary
 * $secondaryColor: 선택, 없을시 $bgColor 동일
 * $borderColor: 선택, 없을시 $bgColor 동일
 */
const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;

  padding: 0.5rem;
  color: var(${({ $color }) => $color});
  background-color: var(${({ $bgColor }) => $bgColor});
  border: 0.5px solid
    var(
      ${({ $borderColor, $bgColor }) => {
        return $borderColor ? $borderColor : $bgColor;
      }}
    );

  overflow-wrap: break-word;
  word-break: keep-all;

  &:hover {
    background-color: var(
      ${({ $secondaryColor, $bgColor }) => {
        return $secondaryColor ? $secondaryColor : $bgColor;
      }}
    );
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 50%;
  }
`;

const StyledLink = styled(Link)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;
  min-width: 3rem;

  padding: 0.5rem;
  color: var(${({ $color }) => $color});
  background-color: var(${({ $bgColor }) => $bgColor});
  border: 0.5px solid
    var(
      ${({ $borderColor, $bgColor }) => {
        return $borderColor ? $borderColor : $bgColor;
      }}
    );
  overflow-wrap: break-word;
  word-break: keep-all;
  &:hover {
    background-color: var(
      ${({ $secondaryColor, $bgColor }) => {
        return $secondaryColor ? $secondaryColor : $bgColor;
      }}
    );
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 50%;
  }
`;

/** components */
export const PrimaryButton: React.FC<ButtonProps> = ({ content, href }) => {
  if (href) {
    return (
      <StyledLink
        href={href}
        $color={DesignTokenVarNames.colors.simple.whitebg}
        $bgColor={DesignTokenVarNames.colors.simple.primary}
        $secondaryColor={DesignTokenVarNames.colors.simple.primarydeeper}
      >
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      $color={DesignTokenVarNames.colors.simple.whitebg}
      $bgColor={DesignTokenVarNames.colors.simple.primary}
      $secondaryColor={DesignTokenVarNames.colors.simple.primarydeeper}
    >
      {content}
    </StyledButton>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ content, href }) => {
  if (href) {
    return (
      <StyledLink
        href={href}
        $color={DesignTokenVarNames.colors.simple.whitebg}
        $bgColor={DesignTokenVarNames.colors.simple.secondary}
        $secondaryColor={DesignTokenVarNames.colors.simple.secondary}
        $borderColor={DesignTokenVarNames.colors.simple.whitebg}
      >
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      $color={DesignTokenVarNames.colors.simple.whitebg}
      $bgColor={DesignTokenVarNames.colors.simple.secondary}
      $secondaryColor={DesignTokenVarNames.colors.simple.secondary}
      $borderColor={DesignTokenVarNames.colors.simple.whitebg}
    >
      {content}
    </StyledButton>
  );
};
