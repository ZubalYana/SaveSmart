import React from 'react';
import SideMenu from '../SideMenu/SideMenu';

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="layout-with-sidebar">
      <SideMenu />
      <div className="content-area">
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
