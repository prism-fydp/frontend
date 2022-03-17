/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const MenuCircle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ededed;
  transition-duration: 250ms;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const MenuDot = styled.div`
  height: 4px;
  width: 4px;
  margin-right: 3px;
  background-color: black;
  border-radius: 50%;
`;

interface Option {
  name: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  options: Array<Option>;
}

const DropdownContainer = styled.div`
  position: absolute;
  right: -40px;
  margin-top: 10px;
  width: 100px;
  background-color: white;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.1),
    inset 0px 0px 1px rgba(255, 255, 255, 0.5);
`;

const DropdownArrow = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  border-style: solid;
  border-width: 6px;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-top-color: white;
  border-right-color: white;
  box-shadow: 1px -1px 1px rgba(255, 255, 255, 0.5);
  transform: translate(-4px, -6px) rotate(-45deg);
`;

const DropdownItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding-left: 8px;
  margin: 0px;
  transition-duration: 250ms;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const DropdownItemName = styled.p`
  margin-top: 4px;
  margin-bottom: 4px;
`;

function Dropdown({ options }: DropdownMenuProps) {
  return (
    <DropdownContainer>
      <DropdownArrow />
      {options.map((option) => {
        return (
          <DropdownItemContainer key={option.name} onClick={option.onClick}>
            <DropdownItemName>{option.name}</DropdownItemName>
          </DropdownItemContainer>
        );
      })}
    </DropdownContainer>
  );
}

export default function DropdownMenu({ options }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <MenuContainer onClick={toggleIsOpen}>
        <MenuCircle>
          <MenuDot />
          <MenuDot />
          <MenuDot style={{ margin: 0 }} />
        </MenuCircle>
        {isOpen && <Dropdown options={options} />}
      </MenuContainer>
    </div>
  );
}
