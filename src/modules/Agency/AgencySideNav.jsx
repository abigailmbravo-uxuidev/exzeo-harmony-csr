import React from 'react';
import { NavLink } from 'react-router-dom';

const csrLinks = agencyCode => [{
  key: 'overview',
  link: `/agency/${agencyCode}/overview`,
  label: 'Overview',
  styleName: 'overview',
  exact: true
},
{
  key: 'contracts',
  link: `/agency/${agencyCode}/contracts`,
  label: 'Contracts',
  styleName: 'contracts',
  exact: true
},
{
  key: 'agents',
  link: `/agency/${agencyCode}/agents`,
  label: 'Agents',
  styleName: 'agents',
  exact: true
}, {
  key: 'notes',
  link: '#',
  label: 'Notes / Files',
  styleName: 'notes disabled',
  exact: true
}];

export const SideNav = ({ agencyCode }) => (
  <nav className="site-nav">
    <ul>
      {csrLinks(agencyCode).map((agentLink, index) => (
        <li key={index}>
          <span className={agentLink.styleName}>
            <NavLink to={agentLink.link} activeClassName="active" exact>{agentLink.label}</NavLink>
          </span>
        </li>))
      }
    </ul>
  </nav>);

export default SideNav;
