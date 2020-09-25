import React, { useMemo } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useUser } from '../context/user-context';
import { useDiaries } from '../context/diaries-context';
import { isPastDue, isToday } from '../modules/Diaries/utilities';
import { doesUserHaveAccess } from '../utilities/userResources';

export const getNavLinks = ({ enableBulkMortgage }) => {
  return [
    {
      id: 'bulk-mortgage',
      path: '/bulkMortgage',
      name: 'Bulk Mortgage',
      hidden: !enableBulkMortgage
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
      name: 'Policy',
      activeRoutes: ['/', '/quote', '/address']
    }
  ];
};

const MainNavigation = () => {
  const userProfile = useUser();
  const { diaries } = useDiaries();
  const history = useHistory();

  const pastDiaries = useMemo(
    () =>
      diaries.filter(diary => {
        const entry = diary.entries[0];
        return entry.open && (isPastDue(entry.due) || isToday(entry.due));
      }),
    [diaries]
  );

  const enableBulkMortgage = useMemo(
    () =>
      doesUserHaveAccess(
        userProfile.resources,
        'INSERT',
        'BulkMortgage:MortgageeJobs:*'
      ),
    [userProfile.resources]
  );
  return (
    <nav>
      <NavLink exact to="/diaries" data-test="diaries-link">
        Diaries
        {pastDiaries.length > 0 && (
          <span className="count-bubble">{pastDiaries.length}</span>
        )}
      </NavLink>

      {getNavLinks({ enableBulkMortgage }).map(
        ({ path, name, id, hidden, activeRoutes }) => (
          <NavLink
            key={id}
            exact
            isActive={(match, location) => {
              if (
                Array.isArray(activeRoutes) &&
                activeRoutes.includes(location.pathname)
              ) {
                return true;
              }
              return match;
            }}
            to={path}
            data-test={`${id}-link`}
            hidden={hidden}
          >
            {name}
          </NavLink>
        )
      )}
      <div className="user-name">{userProfile.userName || ''}</div>
      <button tabIndex="0" className="btn btn-action">
        <i className="fa fa-gear" />
      </button>
      <button
        tabIndex="0"
        className="btn logout btn-action"
        type="button"
        onClick={() => history.replace('/logout')}
      >
        <i className="fa fa-sign-out" />
      </button>
    </nav>
  );
};

export default MainNavigation;
