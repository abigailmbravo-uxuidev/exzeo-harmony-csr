import { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDiaries } from '../state/actions/diary.actions';
import { useUser } from '../context/user-context';

let inactiveBrowserTabKey;
if (typeof document.hidden !== 'undefined') {
  inactiveBrowserTabKey = 'hidden';
} else if (typeof document.msHidden !== 'undefined') {
  inactiveBrowserTabKey = 'msHidden';
} else if (typeof document.webkitHidden !== 'undefined') {
  inactiveBrowserTabKey = 'webkitHidden';
}

const REQUIRED_DIARY_RIGHTS = ['READ', 'UPDATE', 'INSERT'];
const POLLING_TIMEOUT = 30000;

function isPollingPermitted(resources = []) {
  if (!Array.isArray(resources)) return false;

  const diariesResources = [];
  // find all three 'Diaries' resources ignoring duplicates
  REQUIRED_DIARY_RIGHTS.forEach(right => {
    const resource = resources.find(r => {
      return r.uri.indexOf('Diaries') !== -1 && r.right === right;
    });

    if (resource) {
      diariesResources.push(resource);
    }
  });

  return diariesResources.length === 3;
}

const DiaryPolling = ({ filter, fetchDiaries }) => {
  const userProfile = useUser();
  const doesUserHaveAccess = useMemo(
    () => isPollingPermitted(userProfile.resources),
    [userProfile.resources]
  );

  useEffect(() => {
    let interval;
    if (doesUserHaveAccess) {
      fetchDiaries(filter);

      interval = setInterval(() => {
        // skip polling if browser tab is "hidden"/inactive
        if (!document[inactiveBrowserTabKey]) {
          fetchDiaries(filter);
        }
      }, POLLING_TIMEOUT);
    }

    return () => clearInterval(interval);
    // Ignoring 'filter' because in all use cases, the filter prop does not change on the same instance of 'DiaryPolling'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doesUserHaveAccess, fetchDiaries]);

  return null;
};

DiaryPolling.propTypes = {
  fetchDiaries: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    userId: PropTypes.string,
    resourceType: PropTypes.string,
    resourceId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }).isRequired
};

export default connect(null, { fetchDiaries })(DiaryPolling);
