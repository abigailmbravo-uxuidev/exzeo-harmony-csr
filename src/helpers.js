export default function currencyFormatting(value) {
  const formattedValue = Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return formattedValue;
}
