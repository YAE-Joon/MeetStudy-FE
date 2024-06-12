import styled from "styled-components";

interface ButtonProps {
  $bgColor: string;
  $hoverBgColor: string;
  $color?: string;
  $border?: string;
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 16rem;
  @media (min-width: 768px) {
    width: 30em;
  }
`;

const Logo = styled.img`
  height: 50px;
  margin-top: 2.5rem;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  width: 100%;
`;

const InputGroup = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const Input = styled.input`
  appearance: none;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  color: #1f2937;
  &:focus {
    outline: none;
    ring: 0.25rem solid #6366f1;
    border-color: #6366f1;
    z-index: 10;
  }
  font-size: 0.875rem;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: ${(props) => props.$color || "white"};
  background-color: ${(props) => props.$bgColor};
  border: ${(props) => props.$border || "none"};
  &:hover {
    background-color: ${(props) => props.$hoverBgColor};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    border-top: 1px solid #d1d5db;
  }
  &::before {
    margin-right: 1rem;
  }
  &::after {
    margin-left: 1rem;
  }
  span {
    color: #4b5563;
  }
`;
const StyledModal = {
  ModalWrapper,
  Logo,
  Title,
  Form,
  InputGroup,
  Input,
  Button,
  Divider,
};
export default StyledModal;
