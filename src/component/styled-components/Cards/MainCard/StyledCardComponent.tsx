import styled, { keyframes } from "styled-components";

const SectionColors = {
  bgGray100: "#f7fafc",
  bgWhite: "#ffffff",
  shadowMd: "0 4px 6px rgba(0, 0, 0, 0.1)",
  shadowLg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  primaryColor: "#3b82f6",
  gray500: "#6b7280",
};

export const SectionSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 3rem 0;
  width: 100%;
  overflow: hidden;

  @media (min-width: 600px) {
    padding: 4rem 0;
  }
`;

export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 600px) {
    padding: 0 1.5rem;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
`;

export const SectionCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: ${SectionColors.shadowMd};
  transition: all 0.3s ease-in-out;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${SectionColors.shadowLg};
  }

  &:nth-child(odd) {
    animation-delay: 0.2s;
  }

  &:nth-child(even) {
    animation-delay: 0.4s;
  }
`;

export const SectionCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionIconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  color: ${SectionColors.primaryColor};
  margin-right: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const SectionDescription = styled.p`
  color: ${SectionColors.gray500};
`;

/// for review

// export const ReviewSectionGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 2rem;
//   align-items: stretch;

//   @media (min-width: 600px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 2.5rem;
//   }
// `;
export const SectionReviewCard = styled.div`
  background-color: ${SectionColors.bgWhite};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: ${SectionColors.shadowMd};
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${SectionColors.shadowLg};
  }
`;

export const SectionReviewCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SectionProfilePic = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const SectionReviewTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionReviewTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const SectionReviewCategory = styled.span`
  font-size: 0.875rem;
  color: ${SectionColors.primaryColor};
`;

export const SectionReviewDescription = styled.p`
  color: ${SectionColors.gray500};
`;

export const SectionReviewAuthor = styled.p`
  font-size: 0.875rem;
  color: ${SectionColors.gray500};
  margin-top: 0.5rem;
`;
