import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0px auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);

  .error {
    font-size: 14px;
    color: red;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  // gap: 1.25rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #555;
  margin-top: 1.5rem;
`;

export const Input = styled.input`
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin: 0.5rem 0;
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
  margin: 0.5rem 0;
`;

export const FileInput = styled.input`
  font-size: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;
