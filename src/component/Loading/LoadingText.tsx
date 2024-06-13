"use client";
import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const TextSpan = styled.span<{ delay: number }>`
  display: inline-block;
  animation: ${fadeInOut} 1.5s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const Wrapper = styled.div`
  white-space: pre;
  font-size: 15px;
`;

const LoadingTextComponent = () => {
  const text = "데이터를 불러오고 있습니다...";

  return (
    <Wrapper>
      {text.split("").map((char, index) => (
        <TextSpan key={index} delay={index * 0.1}>
          {char}
        </TextSpan>
      ))}
    </Wrapper>
  );
};

export default LoadingTextComponent;
