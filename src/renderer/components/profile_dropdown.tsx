import { useNavigate } from '../hooks/core';
import Paths from '../pages/paths';
import Dropdown from './dropdown';
import profile from '../../../assets/profile/profile.png';

export default function ProfileDropdown({ onSignOut }) {
  const navigate = useNavigate();
  const dropdownOptions = [
    {
      id: 0,
      text: 'Settings',
      onClick: () => {
        navigate(Paths.SETTINGS);
      },
    },
    {
      id: 1,
      text: 'Sign Out',
      onClick: () => {
        onSignOut();
        navigate(Paths.LANDING);
      },
    },
  ];

  return (
    <Dropdown
      title={<img alt="Profile" src={profile} />}
      options={dropdownOptions}
    />
  );
}
