import { defaultMemoize } from 'reselect';

export const userResources = defaultMemoize((userProfile = {}, right, uri) => {
  const enableBulkMortgage = userProfile?.resources.find(r => {
    return r.right === right && r.uri.includes(uri);
  });

  return {
    enableBulkMortgage
  };
});

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
