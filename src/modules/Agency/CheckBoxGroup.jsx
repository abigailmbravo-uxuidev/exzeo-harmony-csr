import React from 'react';

const CheckboxGroup = ({ input, meta, options }) => {
  const {
    name, onChange, onFocus
  } = input;
  const { touched, error } = meta;
  const inputValue = input.value;

  const checkboxes = options.map(({ label, value }, index) => {
    const handleChange = (event) => {
      const arr = [...inputValue];
      if (event.target.checked) {
        arr.push(value);
      } else {
        arr.splice(arr.indexOf(value), 1);
      }
      return onChange(arr);
    };
    const checked = inputValue.includes(value);
    return (
      <label key={`checkbox-${index}`}>
        <input type="checkbox" name={`${name}[${index}]`} value={value} checked={checked} onChange={handleChange} onFocus={onFocus} />
        <span>{label}</span>
      </label>
    );
  });

  return (
    <div>
      <div>{checkboxes}</div>
      {touched && error && <p className="error">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
