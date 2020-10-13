import React from 'react';
import PropTypes from 'prop-types';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';

const SideNav = ({ navLinks, children }) => {
  return (
    <nav className="site-nav">
      <SideNavigation navLinks={navLinks}>
        <hr className="nav-division" />
        {children}
      </SideNavigation>
    </nav>
  );
};

SideNav.propTypes = {
  navLinks: PropTypes.array,
  children: PropTypes.node
};

export default SideNav;
