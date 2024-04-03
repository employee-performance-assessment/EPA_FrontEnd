function Input({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  inputClassName,
  spanClassName,
  spanId,
  required,
  minLength,
  maxLenght
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        className={inputClassName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        minLength={minLength}
        maxLength={maxLenght}
      />
      <span className={spanClassName} id={spanId}>{error}</span>
    </>
  );
}

export default Input;
