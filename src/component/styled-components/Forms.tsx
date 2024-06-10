import styled from "styled-components";

import dt from "@/lib/designToken/designTokens";

import { BasicButton } from "@/component/styled-components/Button/Buttons";

/** common */
const tokens = dt.DesignTokenVarNames;
const mobileWidth = dt.DesignTokenExcept.media.mobile;

export const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  width: 100%;
`;

export const BasicField = styled.fieldset`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 500px;

  height: 2.5rem;
  padding: 0;
  margin: 0;

  border: none;

  gap: 1rem;
  > * {
    flex: 1;
  }
`;

export const BasicFieldRow = styled(BasicField)`
  flex-direction: row;
  flex-wrap: nowrap;

  @media (max-width: 300px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

export const BasicFieldCol = styled(BasicField)`
  flex-direction: column;
`;

export const SubmitButtons = styled(BasicButton)`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 100%;

  padding: 0 1rem;
  margin: auto 0;

  background-color: var(${tokens.colors.simple.tertiarygray});
  border: 0.5px solid var(${tokens.colors.simple.primary});
  border-radius: 3px;

  &:hover {
    background-color: var(${tokens.colors.simple.annotations});
  }
`;

/////////// Inputs ///////////////

export const BasicInput = styled.input`
  box-sizing: border-box;

  height: 100%;
  padding: 0.2rem 1rem;
  margin: auto 0;

  border: none;
  border-bottom: 2px solid var(${tokens.colors.simple.tertiarygray});

  background-color: #f0f0f0;
  outline: none;
  font-size: var(${tokens.fontSize.web.small});

  &:valid {
    border-bottom-color: var(${tokens.colors.simple.validgreen});
    color: var(${tokens.colors.simple.validgreen});
  }

  &:invalid {
    border-bottom-color: var(${tokens.colors.simple.validgreen});
    color: var(${tokens.colors.simple.validgreen});
  }

  @media only screen and (max-width: ${mobileWidth}) {
    width: 50%;
    font-size: var(${tokens.fontSize.mobile.small});
  }
`;

///////// label, select ////////////

export const BasicSelect = styled.select`
  background-color: var(${tokens.colors.simple.tertiarygray});
`;

export const BasicLabel = styled.label`
  font-weight: 400;
`;
