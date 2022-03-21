const isValid = (value) => {
  const invalidTypes = ['null', 'undefined', 'object'];

  if (invalidTypes.includes(typeof value)) throw new Error('Missing params');
  if (typeof value === 'string' && value.length <= 0)
    throw new Error('Missing params');
  return value;
};

export default isValid;
