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
      />
      <span className={spanClassName} id={spanId}>{error}</span>
    </>
  );
}

export default Input;
