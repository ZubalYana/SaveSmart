import React from 'react';
import SideMenu from '../SideMenu/SideMenu';

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="layout-with-sidebar w-[100%] flex">
      <SideMenu />
      <div className="content-area w-[81%]">
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
