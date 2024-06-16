"use client";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
  padding: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: lightgray;
  padding: 2rem;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  letter-spacing: -0.05em;
  color: black;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: black;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: lightslategray;

  padding: 0 24px;
  font-size: 0.875rem;
  font-weight: 20px;
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;

  &:hover {
    background-color: green;
    color: white;
  }

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const Packed404Components = {
  Container,
  Content,
  Title,
  Message,
  HomeLink,
};

export default Packed404Components;
