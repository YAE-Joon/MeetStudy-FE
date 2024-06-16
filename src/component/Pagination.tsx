import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
`;

const PaginationButton = styled.button`
  margin: 0 0.5em;
  padding: 0.5em 1em;
  border: 1px solid #007bff;
  background: #fff;
  color: #007bff;
  cursor: pointer;
  &:disabled {
    color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </PaginationButton>
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
