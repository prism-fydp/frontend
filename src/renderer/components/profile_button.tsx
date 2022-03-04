import Dropdown from './dropdown';
import profile from '../../../assets/profile/profile.png';

export default function ProfileDropdown() {
  const dropdownOptions = [
    {
      id: 0,
      text: 'Profile',
      onClick: () => {},
    },
    {
      id: 1,
      text: 'Settings',
      onClick: () => {},
    },
    {
      id: 2,
      text: 'Sign Out',
      onClick: () => {},
    },
  ];

  return (
    <Dropdown
      title={<img alt="Profile" src={profile} />}
      options={dropdownOptions}
    />
  );
}
