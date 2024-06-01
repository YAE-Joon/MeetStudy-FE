"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import {
  StyledComponentsProps,
  StyledProps,
} from "@/component/styled-components/styledProps";
import { floatAnimation } from "@/component/styled-components/Animations";

/** common */
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

interface StyledButtonProps extends StyledProps {
  $color: string | null;
  $secondaryColor?: string | null;
  $bgColor: string | null; //primary
  $borderColor?: string | null;
}

interface ButtonProps extends StyledComponentsProps {
  href?: string | null;
  onClick?: () => void;
  type?: "primary" | "secondary";
  $arrow?: "up" | "down";
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
        $color={tokens.colors.simple.whitebg}
        $bgColor={tokens.colors.simple.primary}
        $secondaryColor={tokens.colors.simple.primarydeeper}
      >
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      $color={tokens.colors.simple.whitebg}
      $bgColor={tokens.colors.simple.primary}
      $secondaryColor={tokens.colors.simple.primarydeeper}
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
        $color={tokens.colors.simple.whitebg}
        $bgColor={tokens.colors.simple.secondary}
        $secondaryColor={tokens.colors.simple.secondary}
        $borderColor={tokens.colors.simple.whitebg}
      >
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      $color={tokens.colors.simple.whitebg}
      $bgColor={tokens.colors.simple.secondary}
      $secondaryColor={tokens.colors.simple.secondary}
      $borderColor={tokens.colors.simple.whitebg}
    >
      {content}
    </StyledButton>
  );
};

// Moving Buttons

interface ButtonProps extends StyledComponentsProps {
  href?: string | null;
  onClick?: () => void;
  type?: "primary" | "secondary";
  $arrow?: "up" | "down";
}

const CircleButton = styled.button<ButtonProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(
    ${({ type }) =>
      type === "primary"
        ? tokens.colors.simple.primary
        : tokens.colors.simple.secondary}
  );
  border: 2px
    solidvar(
      ${({ type }) =>
        type === "primary"
          ? tokens.colors.simple.primary
          : tokens.colors.simple.secondary}
    );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  position: relative;
  bottom: 10vh;

  animation: ${floatAnimation} 2.5s ease-in-out infinite;

  &:hover {
    background-color: var(${tokens.colors.simple.annotations});

    animation-play-state: paused;
  }

  &:before {
    content: ${({ $arrow }) => {
      return $arrow === "up" ? "'↑'" : "'↓'";
    }};
    font-size: 20px;
    color: white;
  }
`;

// Up

export const MovingButton: React.FC<ButtonProps> = ({
  onClick,
  type,
  $arrow,
}) => {
  return <CircleButton onClick={onClick} type={type} $arrow={$arrow} />;
};
