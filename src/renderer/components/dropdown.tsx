import './dropdown.css';
import { useState } from 'react';

interface ListItem {
  id: number;
  text: string;
  onClick: () => void;
}

interface Props {
  title: string | JSX.Element;
  options: ListItem[];
}

export default function Dropdown({ title, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-header">
        <button
          type="button"
          className={
            typeof title === 'string'
              ? 'dropdown-title'
              : 'dropdown-title-component'
          }
          onClick={() => setIsOpen(true)}
        >
          {title}
        </button>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map(({ id, text, onClick }) => (
            <li className="dropdown-item" key={id.toString()}>
              <button
                type="button"
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
