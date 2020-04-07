import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import DiaryPolling from '../DiaryPolling';
import { isPastDue, isToday } from '../../utilities/diaries';
import logo from '../../img/Harmony.svg';

const handleLogout = auth => {
  auth.logout();
};

const navLinks = [
  {
    id: 'bulk-mortgage',
    path: '/bulkMortgage',
    name: 'Bulk Mortgage'
  },
  {
    id: 'reports',
    path: '/reports',
    name: 'Reports'
  },
  {
    id: 'agency',
    path: '/agency',
    name: 'Agency'
  },
  {
    id: 'bulk-payments',
    path: '/finance/payments',
    name: 'Finance'
  },
  {
    id: 'policy',
    path: '/',
    name: 'Policy'
  }
];

const Header = ({ auth, authState: { userProfile = {} }, diaries }) => {
  const pastDiaries = diaries.filter(diary => {
    const entry = diary.entries[0];
    return (isPastDue(entry.due) || isToday(entry.due)) && entry.open;
  });
  return (
    <header>
      <div role="banner">
        <button className="btn-icon btn-bars">
          <i className="fa fa-bars" />
        </button>
        <Link to="/" id="logo" className="logo">
          <img src={logo} alt="Harmony" />
        </Link>
        <button className="btn-icon btn-ellipsis-v">
          <i className="fa fa-ellipsis-v" />
        </button>
        <nav>
          <NavLink
            activeClassName="active"
            exact
            to="/diaries"
            data-test="diaries-link"
          >
            Diaries
            {pastDiaries.length > 0 && (
              <span className="count-bubble">{pastDiaries.length}</span>
            )}
          </NavLink>
          {navLinks.map(({ path, name, id }) => (
            <NavLink
              id={id}
              activeClassName="active"
              exact
              to={path}
              data-test={`${id}-link`}
            >
              {name}
            </NavLink>
          ))}
          <div className="user-name">
            {userProfile ? userProfile.userName : ''}
          </div>
          <button tabIndex="0" className="btn btn-action">
            <i className="fa fa-gear" />
          </button>
          <button
            tabIndex="0"
            className="btn logout btn-action"
            type="button"
            onClick={() => handleLogout(auth)}
          >
            <i className="fa fa-sign-out" />
          </button>
        </nav>
      </div>
      {userProfile && userProfile.userId && (
        <DiaryPolling filter={{ assignees: [userProfile.userId] }} />
      )}
    </header>
  );
};

Header.propTypes = {
  auth: PropTypes.shape({
    logout: PropTypes.func
  }).isRequired,
  authState: PropTypes.shape({
    userProfile: PropTypes.object
  })
};

const mapStateToProps = state => ({
  authState: state.authState,
  diaries: state.diaries
});

export default connect(mapStateToProps)(Header);
