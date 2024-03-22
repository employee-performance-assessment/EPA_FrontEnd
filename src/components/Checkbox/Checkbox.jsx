import { useState } from 'react';
import './Checkbox.scss';

const Checkbox = ({ labelLeft, labelRight }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label
      className={`switch-checkbox ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}
    >
      <div className="left-side">
        <span>{labelLeft}</span>
      </div>
      <div className="right-side">
        <span>{labelRight}</span>
      </div>
    </label>
  );
};

export default Checkbox;
