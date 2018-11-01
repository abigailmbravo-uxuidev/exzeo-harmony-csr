const isUnique = (value, allValues, props, name) => {
  const exception = props.initialValues ? props.initialValues[name] : null;
  return value && props[`${name}s`].includes(value) && value !== exception
    ? 'This must be unique.' 
    : undefined;
};

export { isUnique };