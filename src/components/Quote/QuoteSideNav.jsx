import React from 'react';
import { NavLink } from 'react-router-dom';

// Example of a possible schema
/**
 * {
 *  link,
 *  label,
 *  styleName,
 *  exact,
 *  outside
 * }
 */
const csrLinks = [{
  link: '/quote/coverage',
  label: 'Coverage / Rating',
  styleName: 'coverage',
  exact: true
},{
  link: '/quote/underwriting',
  label: 'Underwriting',
  styleName: 'underwriting',
  exact: true
},{
  link: '/quote/billing',
  label: 'Mailing Addr / Billing',
  styleName: 'billing',
  exact: true
},{
  link: '/quote/notes',
  label: 'Notes / Files',
  styleName: 'notes',
  exact: true
}];

const SideNav = () => (
  <nav className="site-nav">
    <ul>
      {csrLinks && csrLinks.length > 0 && csrLinks.map((agentLink, index) => (
        agentLink.outside ?
          <li key={index}>
            {/*<a className={agentLink.styleName} href={agentLink.link}>*/}
            <a className="csr-dashboard" href="/">
              <span>{agentLink.label}</span>
            </a>
          </li> :
          <li key={index}>
            <NavLink exact={agentLink.exact} className={agentLink.styleName} to={agentLink.link} activeClassName="active">
              <span>{agentLink.label}</span>
            </NavLink>
          </li>
      ))}
    </ul>
  </nav>
);

// TODO: Needs to be connected to wherever it's gonnna get nav links from
export default SideNav;
