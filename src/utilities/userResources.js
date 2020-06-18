import { defaultMemoize } from 'reselect';

export const userResources = defaultMemoize((userProfile = {}) => {
  const enableBulkMortgage = userProfile?.profile?.bulkMortgageEnabled;

  return {
    enableBulkMortgage
  };
});

export function buildAssigneesList(users, useUserName) {
  const activeUsers = users.filter(user => !!user.enabled);

  const userList = activeUsers.map(user => ({
    answer: useUserName ? user.username : user.userId,
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
