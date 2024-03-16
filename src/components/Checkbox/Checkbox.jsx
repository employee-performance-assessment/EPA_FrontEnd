import { useState } from 'react';
import './Checkbox.scss';

const Checkbox = () => {
  // props { labelLeft, labelRight, colorAccent }
  // labelLeft и labelRight - текст, colorAccent - фон для кнопки при состоянии isChecked
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const labelLeft = 'Руководителя'; // 'Общий рейтинг'
  const labelRight = 'Всей команды'; // 'Баллы за задачу'
  const colorChecked = '#C5B6F1'; // '#00D37F'
  const colorMain = '#333232';

  return (
    <label
      className={`switch-checkbox ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}
    >
      <div
        className="left-side"
        style={{ backgroundColor: isChecked ? colorMain : colorChecked }}
      >
        <span>{labelLeft}</span>
      </div>
      <div
        className="right-side"
        style={{ backgroundColor: isChecked ? colorChecked : colorMain }}
      >
        <span>{labelRight}</span>
      </div>
    </label>
  );
};

export default Checkbox;
