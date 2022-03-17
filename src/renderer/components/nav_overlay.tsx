import './nav_overlay.css';

import React from 'react';
import Paths from '../pages/paths';
import NavButton from './nav_button';
import ProfileDropdown from './profile_dropdown';
import logo from '../../../assets/logo.svg';

interface Props {
  backButton?: boolean;
  editorButton?: boolean;
  searchBar?: boolean;
  onSignOut?: any;
}

function NavOverlay({
  children,
  backButton,
  editorButton,
  searchBar,
  onSignOut,
}: React.PropsWithChildren<Props>) {
  const searchButton = (
    <div style={{ marginRight: 16 }}>
      <NavButton path={Paths.SEARCH} name="Search" />
    </div>
  );

  return (
    <div className="nav">
      <div className="nav-bar">
        <img width="64px" alt="logo" src={logo} />
        {backButton && <NavButton path={-1} name="Back" />}
        <div
          style={{
            display: 'flex',
            height: 'inherit',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginLeft: 'auto',
            marginRight: 8,
            zIndex: 1,
          }}
        >
          {searchBar && searchButton}
          <ProfileDropdown onSignOut={onSignOut} />
        </div>
      </div>
      {children}
      <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
        {editorButton && <NavButton path={Paths.EDITOR} name="Editor" />}
      </div>
    </div>
  );
}

NavOverlay.defaultProps = {
  backButton: false,
  editorButton: false,
  searchBar: false,
  onSignOut: () => {},
};

export default NavOverlay;
