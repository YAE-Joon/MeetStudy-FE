import Link from "next/link";
import styled, { keyframes } from "styled-components";

import dt from "@/lib/designToken/designTokens";

/** common */
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

////////////////////////////////////////////////////////////
////////////////////// common | basic  /////////////////////
////////////////////////////////////////////////////////////

export interface ButtonProps {
  content?: string | null;
  href?: string | null;
  onClick?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
  className?: string;
}

// styled //
export const StyledLink = styled(Link)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;

  overflow-wrap: break-word;
  word-break: keep-all;

  cursor: pointer;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 50%;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;

  overflow-wrap: break-word;
  word-break: keep-all;

  cursor: pointer;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 50%;
  }
`;

// component //
// > Button.tsx에 있음.

//////////////////////
/** customed styled */
/////////////////////

//

export interface StyledButtonProps extends ButtonProps {
  //글자색
  $textPrimaryColor?: string | null;
  $texSecondaryColor?: string | null;

  //배경색
  $bgPrimaryColor?: string | null; // 배경색 기본
  $bgSecondaryColor?: string | null; //hover시 배경색

  //외곽선색
  $borderPrimaryColor?: string | null;
  $borderSecondaryColor?: string | null;
}

/**
 * $textPrimaryColor: 글자색
 * $texSecondaryColor: hover 시 바뀌는 배경색
 * $bgPrimaryColor: 배경색
 * $bgSecondaryColor: hover시 바뀌는 배경색
 */
const StyledLinkColorCustomed = styled(StyledLink)`
  color: var(${({ $textPrimaryColor }) => $textPrimaryColor});
  background-color: var(
    ${({ $bgPrimaryColor }) => {
      return $bgPrimaryColor;
    }}
  );
  // 외곽선 미설정시 기본 배경색과 같음
  border: 0.5px solid
    var(
      ${({ $borderPrimaryColor, $bgPrimaryColor }) => {
        return $borderPrimaryColor ? $borderPrimaryColor : $bgPrimaryColor;
      }}
    );

  padding: 0.5rem;

  &:hover {
    background-color: var(
      ${({ $bgSecondaryColor, $bgPrimaryColor }) => {
        return $bgSecondaryColor ? $bgSecondaryColor : $bgPrimaryColor;
      }}
    );
  }
`;

/**
 * $textPrimaryColor: 글자색
 * $texSecondaryColor: hover 시 바뀌는 배경색
 * $bgPrimaryColor: 배경색
 * $bgSecondaryColor: hover시 바뀌는 배경색
 */
const StyledButtonColorCustomed = styled(StyledButton)`
  color: var(${({ $textPrimaryColor }) => $textPrimaryColor});
  background-color: var(
    ${({ $bgPrimaryColor }) => {
      return $bgPrimaryColor;
    }}
  );
  // 외곽선 미설정시 기본 배경색과 같음
  border: 0.5px solid
    var(
      ${({ $borderPrimaryColor, $bgPrimaryColor }) => {
        return $borderPrimaryColor ? $borderPrimaryColor : $bgPrimaryColor;
      }}
    );

  &:hover {
    background-color: var(
      ${({ $bgSecondaryColor, $bgPrimaryColor }) => {
        return $bgSecondaryColor ? $bgSecondaryColor : $bgPrimaryColor;
      }}
    );
  }

  padding: 0.5rem;
`;

export const DesignCustomedyButton: React.FC<StyledButtonProps> = ({
  content,
  href,
  onClick,
  className,
  $textPrimaryColor,
  $texSecondaryColor,
  $bgPrimaryColor,
  $bgSecondaryColor,
  $borderPrimaryColor,
  $borderSecondaryColor,
}) => {
  if (href) {
    return (
      <StyledLinkColorCustomed
        href={href}
        $textPrimaryColor={$textPrimaryColor}
        $texSecondaryColor={$texSecondaryColor}
        $bgPrimaryColor={$bgPrimaryColor}
        $bgSecondaryColor={$bgSecondaryColor}
        $borderPrimaryColor={$borderPrimaryColor}
        $borderSecondaryColor={$borderSecondaryColor}
        onClick={onClick}
        className={className}
      >
        {content}
      </StyledLinkColorCustomed>
    );
  }

  return (
    <StyledButtonColorCustomed
      $textPrimaryColor={$textPrimaryColor}
      $texSecondaryColor={$texSecondaryColor}
      $bgPrimaryColor={$bgPrimaryColor}
      $bgSecondaryColor={$bgSecondaryColor}
      $borderPrimaryColor={$borderPrimaryColor}
      $borderSecondaryColor={$borderSecondaryColor}
      onClick={onClick}
      className={className}
    >
      {content}
    </StyledButtonColorCustomed>
  );
};

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const StyledButtonLink = styled(Link)`
  background-color: var(${tokens.colors.simple.primary});
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  margin: 1rem;

  &:hover {
    background-color: var(${tokens.colors.simple.annotations});
    color: black;
    animation: ${bounce} 0.5s infinite;
  }
`;
