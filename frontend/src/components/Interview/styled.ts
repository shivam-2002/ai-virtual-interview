import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: sans-serif;
`;

export const QuestionCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

export const QuestionText = styled.div`
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  resize: none;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #aaa;
  min-height: 60px;
  box-sizing: border-box;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button<{ $secondary?: boolean }>`
  background-color: ${({ $secondary }) => ($secondary ? "#ddd" : "#4CAF50")};
  color: ${({ $secondary }) => ($secondary ? "#000" : "#fff")};
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoadingText = styled.div`
  margin-top: 1rem;
  color: #666;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  min-width: 300px;
  text-align: center;
`;
