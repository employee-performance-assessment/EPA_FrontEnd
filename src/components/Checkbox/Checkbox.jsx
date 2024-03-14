import { useState } from 'react';
import './Checkbox.scss';

const Checkbox = ({ label1, label2 }) => {
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
        <span className="">{label1}</span>
      </div>
      <div className="right-side">
        <span cl>{label2}</span>
      </div>
    </label>
  );
};

export default Checkbox;
