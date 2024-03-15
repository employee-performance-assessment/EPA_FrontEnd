import { useState } from 'react';
import './Checkbox.scss';

const Checkbox = () => {
  // props { label1, label2, color }
  // label1 и label2 - текстб color - фон для кнопки при состоянии isChecked
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const label1 = 'Руководителя'; // 'Общий рейтинг'
  const label2 = 'Всей команды'; // 'Баллы за задачу'
  const color = '#C5B6F1'; // '#00D37F'

  return (
    <label
      className={`switch-checkbox ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}
    >
      <div
        className="left-side"
        style={{ backgroundColor: isChecked ? '#333232' : color }}
      >
        <span className="">{label1}</span>
      </div>
      <div
        className="right-side"
        style={{ backgroundColor: isChecked ? color : '#333232' }}
      >
        <span cl>{label2}</span>
      </div>
    </label>
  );
};

export default Checkbox;
