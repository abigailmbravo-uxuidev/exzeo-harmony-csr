const normalizeNumbers = (value, previousValue) => {
  if (!value) {
    return value;
  }
  let numberValue = value;
  if (!isNaN(value)) {
    numberValue = Math.round(value * 100) / 100;
  }
  const numToString = numberValue.toString();
  if (!previousValue || numberValue.length > previousValue.length) {
    // typing forward
    return `${numToString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  return `${numToString}`;
};

export default normalizeNumbers;
