"use client";
import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
import { BasicButton } from "@/component/styled-components/Button/Buttons";
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

export const RemoveButton = styled(BasicButton)`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 0.5rem;
  margin: auto 0;

  background-color: var(${tokens.colors.simple.invalidred});
  color: white;

  border-radius: 3px;

  &:hover {
    background-color: var(${tokens.colors.simple.invalidred});
  }
`;

const StyledAdmin = { MemberItem, RemoveButton };
export default StyledAdmin;
