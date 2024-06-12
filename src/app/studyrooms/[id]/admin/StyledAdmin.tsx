"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;
const MemberItem = styled.li`
  list-style: none;
  margin: 10px 0;
  font-size: var(${tokens.fontSize.web.small});
  color: var(${tokens.colors.simple.blackbasic});

  & > p {
    display: inline;
    margin: 0;
    padding: 0 5px;
  }
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.1rem;
  background-color: var(${tokens.colors.simple.invalidred});
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const StyledAdmin = { MemberItem, RemoveButton };
export default StyledAdmin;
