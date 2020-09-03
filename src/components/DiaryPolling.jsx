import { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDiaries } from '../state/actions/diary.actions';
import { useUser } from '../context/user-context';

let inactiveTabKey;
if (typeof document.hidden !== 'undefined') {
  inactiveTabKey = 'hidden';
} else if (typeof document.msHidden !== 'undefined') {
  inactiveTabKey = 'msHidden';
} else if (typeof document.webkitHidden !== 'undefined') {
  inactiveTabKey = 'webkitHidden';
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
  const shouldPoll = useMemo(() => isPollingPermitted(userProfile.resources), [
    userProfile.resources
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldPoll && !document[inactiveTabKey]) {
        fetchDiaries(filter);
      }
    }, POLLING_TIMEOUT);
    return clearInterval(interval);
  }, [shouldPoll, fetchDiaries, filter]);

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
