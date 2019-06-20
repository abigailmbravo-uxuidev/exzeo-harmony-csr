export const formatUrl = url =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;

export const removeTerm = id =>
  id && id.replace
    ? id.replace(/(\d{2}-\d{7})-\d{2}/g, (_, group) => group)
    : id;
