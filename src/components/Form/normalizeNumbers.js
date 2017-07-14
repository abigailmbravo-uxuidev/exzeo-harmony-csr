const normalizeNumbers = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const numToString = value.toString();
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    return `${numToString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  return `${numToString}`;
};

export default normalizeNumbers;

