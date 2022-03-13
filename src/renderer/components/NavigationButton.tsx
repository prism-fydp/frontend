import styled from 'styled-components';
import { useNavigate } from '../hooks/core';

export interface NavButtonProps {
  path: any;
  name: string;
}

const Button = styled.button`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  appearance: none;
  font-size: 1.3rem;
  font-family: 'Raleway';
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: all ease-in 0.1s;
  cursor: pointer;
  opacity: 0.9;
`;

export default function NavButton({ path, name }: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <Button type="button" onClick={() => navigate(path)}>
      {name}
    </Button>
  );
}
