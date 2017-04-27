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
const agentLinks = [{
  link: '/quote',
  label: 'Coverage & Rating',
  styleName: 'coverage',
  exact: true
}];

const SideNav = () => (
  <nav className="site-nav">
    <ul>
      {agentLinks && agentLinks.length > 0 && agentLinks.map((agentLink, index) => (
        agentLink.outside ?
          <li key={index}>
            {/*<a className={agentLink.styleName} href={agentLink.link}>*/}
            <a className="csr-dashboard" href="/">
              <i className="fa" />
              <span>{agentLink.label}</span>
            </a>
          </li> :
          <li key={index}>
            <NavLink exact={agentLink.exact} className={agentLink.styleName} to={agentLink.link} activeClassName="active">
              <i className="fa" />
              <span>{agentLink.label}</span>
            </NavLink>
          </li>
      ))}
    </ul>
  </nav>
);

// TODO: Needs to be connected to wherever it's gonnna get nav links from
export default SideNav;
