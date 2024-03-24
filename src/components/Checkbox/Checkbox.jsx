import './Checkbox.scss';

const Checkbox = ({ labelLeft, labelRight, isChecked, setIsChecked, shadow }) => {
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
  </label>;
};

export default Checkbox;
