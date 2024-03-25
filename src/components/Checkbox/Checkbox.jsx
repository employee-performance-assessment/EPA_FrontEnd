import './Checkbox.scss';

function Checkbox({
  labelLeft,
  labelRight,
  isChecked,
  setIsChecked,
  shadow
}) {
  return (
    <label
      style={{ boxShadow: shadow }}
      className={`switch-checkbox ${isChecked ? 'checked' : ''}`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div className="left-side">
        <span>{labelLeft}</span>
      </div>
      <div className="right-side">
        <span>{labelRight}</span>
      </div>
    </label>
  );
}

export default Checkbox;
