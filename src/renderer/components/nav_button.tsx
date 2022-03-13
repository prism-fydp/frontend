import { useNavigate } from '../hooks/Core';

export interface NavButtonProps {
  path: any;
  name: string;
}

export default function NavButton({ path, name }: NavButtonProps) {
  const nav = useNavigate();
  return (
    <button
      style={{ fontFamily: 'Raleway' }}
      className="nav-button"
      type="button"
      onClick={() => nav(path)}
    >
      {name}
    </button>
  );
}
