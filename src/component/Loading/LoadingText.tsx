"use client";
import styled, { keyframes } from "styled-components";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;
const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
`;

const TextSpan = styled.span<{ $delay: number }>`
  display: inline-block;
  animation: ${fadeInOut} 2s infinite;
  animation-delay: ${(props) => props.$delay}s;
`;

const Wrapper = styled.div`
  white-space: pre;
  font-size: var(${tokens.fontSize.web.medium});
  color: var(${tokens.colors.simple.primary});
`;

const LoadingTextComponent = () => {
  const text = "■ ■ ■ ■ ■ ■ ■ ■ ■ ■";
  return (
    <Wrapper>
      {text.split("").map((char, index) => (
        <TextSpan key={index} $delay={index * 0.1}>
          {char}
        </TextSpan>
      ))}
    </Wrapper>
  );
};

export default LoadingTextComponent;
