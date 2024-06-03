"use client";

import React from "react";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import { floatAnimation } from "@/component/styled-components/Animations";
import {
  ButtonProps,
  StyledButton,
  StyledLink,
  DesignCustomedyButton,
} from "@/component/styled-components/Button/buttonsComponents";
/** common */
const tokens = dt.DesignTokenVarNames;

////// Simple Basic Button //////

export const BasicButton: React.FC<ButtonProps> = ({
  content,
  href,
  onClick,
  className,
}) => {
  if (href) {
    return (
      <StyledLink href={href} className={className}>
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton onClick={onClick} className={className}>
      {content}
    </StyledButton>
  );
};

/////////////////////////
// 많이 쓰이는 기본 버튼 //
/////////////////////////

/**
 * 많이 쓰이는 버튼 타입 1
 * textPrimaryColor: 글자색
 * texSecondaryColor: hover 시 바뀌는 배경색
 * bgPrimaryColor: 배경색
 * bgSecondaryColor: hover시 바뀌는 배경색
 */
export const PrimaryButton: React.FC<ButtonProps> = ({
  content,
  href,
  onClick,
}) => {
  return (
    <DesignCustomedyButton
      content={content}
      href={href}
      $textPrimaryColor={tokens.colors.simple.whitebg}
      $bgPrimaryColor={tokens.colors.simple.primary}
      $bgSecondaryColor={tokens.colors.simple.primarydeeper}
      $borderPrimaryColor={tokens.colors.simple.whitebg}
      onClick={onClick}
    />
  );
};
/**
 * 많이 쓰이는 버튼 타입 2
 * textPrimaryColor: 글자색
 * texSecondaryColor: hover 시 바뀌는 배경색
 * bgPrimaryColor: 배경색
 * bgSecondaryColor: hover시 바뀌는 배경색
 */
export const SecondaryButton: React.FC<ButtonProps> = ({
  content,
  href,
  onClick,
}) => {
  return (
    <DesignCustomedyButton
      content={content}
      href={href}
      $textPrimaryColor={tokens.colors.simple.whitebg}
      $bgPrimaryColor={tokens.colors.simple.secondary}
      $bgSecondaryColor={tokens.colors.simple.secondary}
      $borderPrimaryColor={tokens.colors.simple.whitebg}
      onClick={onClick}
    />
  );
};

////////////////////
// Moving Buttons //
///////////////////

interface CircleButtonProps extends ButtonProps {
  type?: "primary" | "secondary";
  $arrow?: "up" | "down";
}

const CircleButton = styled.button<CircleButtonProps>`
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

export const MovingButton: React.FC<CircleButtonProps> = ({
  onClick,
  type,
  $arrow,
}) => {
  return <CircleButton onClick={onClick} type={type} $arrow={$arrow} />;
};
