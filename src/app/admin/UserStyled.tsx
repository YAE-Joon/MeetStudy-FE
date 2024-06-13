import styled from "styled-components";
import dt from "@/lib/designToken/designTokens";
const tokens = dt.DesignTokenVarNames;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 600px;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.thead``;
const StyledTableRow = styled.tr``;
const StyledTableHead = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
`;

const StyledTableBody = styled.tbody``;
const StyledTableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(${tokens.colors.simple.tertiarylightgray});
  max-width: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
interface BadgeProp {
  variant: string;
}

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(${tokens.colors.simple.secondary});
  color: white;
  cursor: pointer;

  margin: 5px;

  &:hover {
    background-color: #2563eb;
  }
`;
export const QuitButton = styled.button`
  padding: 0.2rem 0.2rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 12px;
  background-color: var(${tokens.colors.simple.invalidred});
  color: white;
  cursor: pointer;

  &:hover {
    background-color: red;
  }
`;

const StyledAdminUserPage = {
  Header,
  TableWrapper,
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableHead,
  StyledTableBody,
  StyledTableCell,
  Button,
  QuitButton,
};
export default StyledAdminUserPage;
