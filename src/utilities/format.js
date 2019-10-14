export const formatUrl = url =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;

export const removeTerm = id => {
  if (!id) return id;

  const group = String(id).split('-');
  if (group.length === 1) return id;

  group.pop();
  return group.join('-');
};
