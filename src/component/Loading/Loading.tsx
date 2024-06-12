"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

const tokens = dt.DesignTokenVarNames;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(${tokens.colors.simple.whitebg});
  height: 100vh;
  width: 100vw;
`;

const Spinner = styled.span`
  width: 25rem;
  height: 25rem;
  border: 5px solid #fff;
  border-bottom-color: var(${tokens.colors.simple.primary});
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <Background>
      <Spinner />
    </Background>
  );
};

export default Loading;
