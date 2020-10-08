import React from 'react';
import PropTypes from 'prop-types';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';

const getPolicyNavLinks = policyNumber => [
  {
    key: 'coverage',
    to: `/policy/${policyNumber}/coverage`,
    label: <span>Coverage / Rating</span>,
    className: 'coverage',
    exact: true
  },
  {
    key: 'policyholder',
    to: `/policy/${policyNumber}/policyHolder`,
    label: <span>Policyholder / Agent</span>,
    className: 'policyholder',
    exact: true
  },
  {
    key: 'billing',
    to: `/policy/${policyNumber}/billing`,
    label: <span>Mortgage / Billing</span>,
    className: 'billing',
    exact: true
  },
  {
    key: 'notes',
    to: `/policy/${policyNumber}/notes`,
    label: <span>Notes / Files / Diaries</span>,
    className: 'notes',
    exact: true
  },
  {
    key: 'cancel',
    to: `/policy/${policyNumber}/cancel`,
    label: <span>Cancel Policy</span>,
    className: 'cancel',
    exact: true
  },
  {
    key: 'endorsements',
    to: `/policy/${policyNumber}/endorsements`,
    label: <span>Endorsements</span>,
    className: 'endorsements',
    exact: true
  }
];

const getQuoteNavLinks = quoteNumber => {
  return [
    {
      key: 'coverage',
      to: `/quote/${quoteNumber}/coverage`,
      label: <span>Coverage / Rating</span>,
      className: 'coverage',
      exact: true
    },
    {
      key: 'underwriting',
      to: `/quote/${quoteNumber}/underwriting`,
      label: <span>Underwriting</span>,
      className: 'underwriting',
      exact: true
    },
    {
      key: 'additionalInterests',
      to: `/quote/${quoteNumber}/additionalInterests`,
      label: <span>Additional Interests</span>,
      className: 'additionalInterests',
      exact: true
    },
    {
      key: 'billing',
      to: `/quote/${quoteNumber}/billing`,
      label: <span>Mailing / Billing</span>,
      className: 'billing',
      exact: true
    },
    {
      key: 'notes',
      to: `/quote/${quoteNumber}/notes`,
      label: <span>Notes / Files / Diaries</span>,
      className: 'notes',
      exact: true
    },
    {
      key: 'summary',
      to: `/quote/${quoteNumber}/summary`,
      label: <span>Quote Summary</span>,
      className: 'quote-summary'
    },
    {
      key: 'application',
      to: `/quote/${quoteNumber}/application`,
      label: <span>Application</span>,
      className: 'application',
      exact: true
    }
  ];
};

const SideNav = ({ documentType, number, children }) => {
  const navLinks =
    documentType === 'policy'
      ? getPolicyNavLinks(number)
      : getQuoteNavLinks(number);

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
  documentType: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default SideNav;
