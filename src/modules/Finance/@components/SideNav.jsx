import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  return (
    <aside className="content-panel-left">
      <nav className="site-nav">
        <ul className="side-navigation">
          <li key="bulk-payments">
            <span className="bulk-payments">
              <NavLink to="/finance/payments" activeClassName="active" exact>
                <span>Bulk Payments</span>
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
