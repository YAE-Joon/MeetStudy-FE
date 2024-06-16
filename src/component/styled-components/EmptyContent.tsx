"use client";
import Link from "next/link";
import styled from "styled-components";
// import dt from "@/lib/designToken/designTokens";
// const tokens = dt.DesignTokenVarNames;
// const mobileWidth = dt.DesignTokenExcept.media.mobile;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const EmptyCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
  max-width: 28rem;
  width: 100%;
`;
const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #718096;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
`;

const EmptyStyledLink = styled(Link)`
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

const EmptyStudyRoomContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const PackedStyledEmpty = {
  EmptyStyledLink,
  EmptyText,
  EmptyTitle,
  EmptyCard,
  EmptyContainer,
};
export default PackedStyledEmpty;
