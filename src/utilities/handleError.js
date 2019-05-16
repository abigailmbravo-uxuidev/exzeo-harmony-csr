export default function whandleError(err) {
  // return default error message if non exists
  if (!err) return { message: 'An error occurred that was not handled properly.' };

  let error = err.response && err.response.data ? err.response.data : err;
  // if error is a string, convert to an object
  if (typeof error === 'string') error = { message: error };
  // format error if needed
  if (!error.message) error.message = 'There was an error.';
  return error;
}
