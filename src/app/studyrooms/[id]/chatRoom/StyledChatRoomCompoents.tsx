"use client";
import Link from "next/link";
import styled from "styled-components";
import { StyledProps } from "@/component/styled-components/styledProps";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const ChatRoomContainer = styled.div`
  display: grid;
  gap: 1rem;

  width: 100%;
  min-width: 800px;

  grid-template-columns: 1fr;

  //background-color: blue;
  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    min-width: 400px;

    grid-template-columns: 1fr;
  }
`;
const ChatRoomCard = styled(Link)<StyledProps>`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: #f7fafc;
    border-color: var(${tokens.colors.simple.primary});

    h2 {
      color: var(${tokens.colors.simple.primarydeeper});
    }
  }

  width: 100%;
  //max-width: 50%;

  // background-color: red;
`;
const LinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
const LinkDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const LinkTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
`;
const NoChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const NoChatCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
  max-width: 28rem;
  width: 100%;
`;
const NoChatTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const NoChatText = styled.p`
  color: #718096;
  margin-bottom: 1.5rem;
`;

const NoChatStyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: #38a169;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: medium;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
  &:hover {
    background-color: #2f855a;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const PackedStyledChatrooms = {
  ChatRoomContainer,
  ChatRoomCard,
  LinkContent,
  LinkDetails,
  LinkTitle,
  NoChatContainer,
  NoChatCard,
  NoChatTitle,
  NoChatText,
  NoChatStyledLink,
};

export default PackedStyledChatrooms;
