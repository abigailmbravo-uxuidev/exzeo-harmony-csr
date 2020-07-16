import { defaultMemoize } from 'reselect';

export const userResources = defaultMemoize((userProfile = {}, right, uri) => {
  const enableBulkMortgage = userProfile?.resources.find(r => {
    return r.right === right && r.uri.includes(uri);
  });

  return {
    enableBulkMortgage
  };
});

export const getMatchingResources = (resources = [], uri, right) => {
  return resources.filter(resource => {
    if (process.env.NODE_ENV !== 'production') {
      if (!!resource.conditions) {
        // As we use this more and more, every way we can slim down the resources array will help with perf.
        throw new Error(
          'Please filter out legacy resources in store when user logs in'
        );
      }
    }

    return resource.right === right && resource.uri.includes(uri);
  });
};

export const doesUserHaveAccess = (resources = [], uri, right) => {
  const matchingResources = getMatchingResources(resources, uri, right);

  return matchingResources.length > 0;
};

export function buildAssigneesList(users, field) {
  const activeUsers = users.filter(user => !!user.enabled);

  const userList = activeUsers.map(user => ({
    answer: field ? user[field] : user.userId,
    label: `${user.firstName} ${user.lastName}`,
    type: 'user'
  }));

  return userList.sort((a, b) => {
    const userA = a.label.toUpperCase();
    const userB = b.label.toUpperCase();
    if (userA > userB) return 1;
    if (userA < userB) return -1;
    return 0;
  });
}
