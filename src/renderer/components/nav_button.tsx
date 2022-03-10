import { useNavigate } from 'react-router-dom';

export interface NavButtonProps {
  path: string;
  name: string;
}

export default function NavButton({ path, name }: NavButtonProps) {
  const nav = useNavigate();
  return (
    <button className="nav-button" type="button" onClick={() => nav(path)}>
      {name}
    </button>
  );
}

// {!hideReaderButton && <NavButton path={Paths.READER} name="Reader" />}
