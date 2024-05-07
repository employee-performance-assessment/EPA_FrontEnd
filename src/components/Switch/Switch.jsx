import './Switch.scss';

function Switch({
  labelLeft,
  labelRight,
  isChecked,
  setIsChecked,
  handleChange,
  shadow,
}) {

  const handleToggle = () => {
    if (handleChange) {
      handleChange();
    } else {
      setIsChecked(!isChecked);
    }
  };
  return (
    <label
      style={{ boxShadow: shadow }}
      className={`switch-checkbox ${isChecked ? 'checked' : ''}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="checkbox-input"
      />
      <div className="left-side">
        <span>{labelLeft}</span>
      </div>
      <div className="right-side">
        <span>{labelRight}</span>
      </div>
    </label>
  );
}

export default Switch;
