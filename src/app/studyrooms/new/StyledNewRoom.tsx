import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
const mobileWidth = dt.DesignTokenExcept.media.mobile;

const Form = styled.div`
  width: 100%;
  max-width: 36rem;
  margin: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  overflow: hidden;
`;

const FormHeader = styled.div`
  padding: 1.5rem;
  background: #f9f9f9;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

// const CardDescription = styled.p`
//   margin: 0.5rem 0 0;
//   color: #6b7280;
// `;

// const CardContent = styled.div`
//   padding: 1.5rem;
//   background: white;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

const FormFooter = styled.div`
  padding: 1.5rem;
  background: #f9f9f9;
  display: flex;
  justify-content: flex-end;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 80%;

  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
    text-align: center;
  }
`;

const StyledNew = { CardTitle, PageWrapper };
export default StyledNew;
