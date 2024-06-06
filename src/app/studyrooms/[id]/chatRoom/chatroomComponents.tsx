"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";

import { StyledProps } from "@/component/styled-components/styledProps";
import { Description } from "@/component/styled-components/TextBoxes";
import { Container } from "@/component/styled-components/Container";
import React from "react";
import Link from "next/link";
import { ChatRoomInfoProps } from "@/lib/types";
// const ChatRoomCard = () =>{

// }

const ChatRoomContainer = styled.div`
  display: grid;
  gap: 1rem;

  width: 100%;
  min-width: 900px;
`;

const ChatRoomCard = styled(Link)<StyledProps>`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
  &:hover {
    background-color: #f7fafc;
  }
`;

const LinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const ChatRoomList = ({
  chatRoomList,
}: {
  chatRoomList: ChatRoomInfoProps[];
}) => {
  return (
    <ChatRoomContainer>
      {chatRoomList.map((chatRoomInfo, idx) => (
        <ChatRoomCard key={idx} href={"/"}>
          <LinkContent>
            <LinkTitle>{chatRoomInfo.title}</LinkTitle>
            <LinkDetails>{chatRoomInfo.desc} </LinkDetails>
          </LinkContent>
        </ChatRoomCard>
      ))}
    </ChatRoomContainer>
  );
};
