const normalizeNumbers = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const numToString = value.toString();
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (numToString.length < 4) {
      return `${numToString}`;
    }
    if (numToString.length === 4) {
      return `${numToString.slice(0, 1)},${numToString.slice(1, 4)}`;
    }
    if (numToString.length === 5) {
      return `${numToString.slice(0, 2)},${numToString.slice(2, 5)}`;
    }
    if (numToString.length === 6) {
      return `${numToString.slice(0, 3)},${numToString.slice(3, 6)}`;
    }
    if (numToString.length === 7) {
      return `${numToString.slice(0, 1)},${numToString.slice(1, 4)}, ${numToString.slice(4, 7)}`;
    }
  }
  return `${numToString}`;
};

export default normalizeNumbers;

