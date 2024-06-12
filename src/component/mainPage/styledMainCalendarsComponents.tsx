import React from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import { StyledProps } from "@/component/styled-components/styledProps";

const StyledDetails = styled.div`
  background: "#F7FAFC";
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  // background-color: red;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  // background-color: blue;
  width: 100%;

  justify-content: space-between;
`;

const CalDate = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CalTitle = styled.h4<StyledProps>`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  text-align: left;
`;

interface Expandedprops extends StyledProps {
  $expanded?: boolean;
}
const StyledDescription = styled.div<Expandedprops>`
  max-height: ${(props) => (props.$expanded ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.5s ease;
  opacity: ${(props) => (props.$expanded ? "1" : "0")};
  margin-top: ${(props) => (props.$expanded ? "1rem" : "0")}; /* 간격 추가 */
`;

const IconWrapper = styled.div<{ rotate: boolean }>`
  width: 1.25rem; /* equivalent to w-5 in Tailwind */
  height: 1.25rem; /* equivalent to h-5 in Tailwind */
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.rotate ? "180deg" : "0deg")});
`;

const GhostButton = styled.button`
  background: transparent;
  color: #4a5568;
  padding: 0.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #1a202c;
  }
`;

const StyledMainCal = {
  StyledDetails,
  MainTitleWrapper,
  CalDate,
  CalTitle,
  StyledDescription,
  GhostButton,
  IconWrapper,
};
export default StyledMainCal;
