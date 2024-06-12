"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { ChatRoomInfoProps } from "@/lib/types";
import dt from "@/lib/designToken/designTokens";
import { StyledProps } from "@/component/styled-components/styledProps";
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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

export const ChatRoomList = ({
  chatRoomList,
}: {
  chatRoomList: ChatRoomInfoProps[];
}) => {
  const params = useParams();
  const pathname = usePathname();
  //console.log("pathname?", pathname);
  return (
    <ChatRoomContainer>
      {chatRoomList.map((chatRoomInfo, idx) => (
        <ChatRoomCard
          key={chatRoomInfo.id}
          href={`${pathname}/${chatRoomInfo.id}`}
        >
          <LinkContent>
            <LinkTitle>{chatRoomInfo.title}</LinkTitle>
            <LinkDetails>{chatRoomInfo.notice} </LinkDetails>
          </LinkContent>
        </ChatRoomCard>
      ))}
    </ChatRoomContainer>
  );
};
