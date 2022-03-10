import './nav_overlay.css';

import React from 'react';
import Paths from 'renderer/pages/paths';
import NavButton from './nav_button';
import ProfileDropdown from './profile_dropdown';

interface Props {
  hideHomeButton?: boolean;
  hideReaderButton?: boolean;
  hideEditorButton?: boolean;
}

function NavOverlay({
  children,
  hideHomeButton,
  hideReaderButton,
  hideEditorButton,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="nav">
      <div className="nav-bar">
        {!hideHomeButton && <NavButton path={Paths.LANDING} name="Home" />}
        {!hideReaderButton && <NavButton path={Paths.READER} name="Reader" />}
        <div className="profile-dropdown">
          <ProfileDropdown />
        </div>
      </div>
      {children}
      <div className="nav-bar bottom-nav-bar">
        {!hideEditorButton && <NavButton path={Paths.EDITOR} name="Editor" />}
      </div>
    </div>
  );
}

NavOverlay.defaultProps = {
  hideHomeButton: false,
  hideReaderButton: false,
  hideEditorButton: false,
};

export default NavOverlay;
