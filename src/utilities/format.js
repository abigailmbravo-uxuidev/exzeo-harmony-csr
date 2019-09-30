export const formatUrl = url =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;
