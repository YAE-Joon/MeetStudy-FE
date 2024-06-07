"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { ChatRoomInfoProps } from "@/lib/types";

import { StyledProps } from "@/component/styled-components/styledProps";

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
