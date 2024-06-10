import styled from "styled-components";

interface TestIconProps {
  backgroundColor: string;
}

export const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  padding: 1em 2em 0;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px 20px 0 0;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid #007bff;
`;

export const TabContent = styled.div`
  width: 100%;
`;

export const SearchBar = styled.input`
  appearance: none;
  border-radius: 0.375rem;
  width: 20em;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  color: #000;
  ::placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const PostButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #007bff;
  border-bottom: 1px solid #007bff;
`;

export const TableRow = styled.tr`
  cursor: pointer;
  th {
    cursor: default;
  }
  &:hover td {
    background-color: #f2f2f2;
  }
  &:last-child td {
    border-bottom: 0;
  }
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

export const TestIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<TestIconProps>`
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #fff;
  padding: 0 5px 0 3px;
  margin: 0 6px 0 10px;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;
