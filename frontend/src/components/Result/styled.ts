import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ScoreBox = styled.div`
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ScoreText = styled.h1`
  font-size: 4rem;
  color: #4caf50;
  margin: 1rem 0;
`;

export const FeedbackText = styled.h4`
  font-size: 1rem;
  color: #000;
  margin: 1rem 0;
  max-width: 400px;
  font-weight: 500;
`;

export const Label = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

export const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #888;
`;

export const GoBackButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #115293;
  }
`;
