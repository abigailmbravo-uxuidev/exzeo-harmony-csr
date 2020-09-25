import { useUser } from '../../context/user-context';
import { useEffect, useMemo } from 'react';
import { useDiaries } from '../../context/diaries-context';
import {
  POLLING_TIMEOUT,
  REQUIRED_DIARY_RIGHTS,
  INACTIVE_BROWSER_TAB_KEY
} from '../../constants/diaries';

export function useDiaryPolling(filter) {
  const { getDiaries } = useDiaries();
  const userProfile = useUser();
  const shouldPoll = useMemo(() => isPollingPermitted(userProfile.resources), [
    userProfile.resources
  ]);

  const pollingFilter = filter || { assignees: [userProfile.userId] };
  useEffect(() => {
    let interval;
    if (shouldPoll) {
      getDiaries(pollingFilter);

      interval = setInterval(() => {
        if (!document[INACTIVE_BROWSER_TAB_KEY]) {
          getDiaries(pollingFilter, { checkEquality: true, noRetries: true });
        }
      }, POLLING_TIMEOUT);
    }

    return () => clearInterval(interval);
    // Firing this 'on mount' only as the filter should not change within the same instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function isPollingPermitted(resources = []) {
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
