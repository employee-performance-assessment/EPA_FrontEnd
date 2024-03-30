import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  showOverlay,
  hiddenOverlay,
  setType,
} from '../../store/slices/filterSlice.js';

import styles from './Select.module.scss';

function Select({
  query,
  buttonText,
  selectStyle,
  listStyle,
  optionStyle,
  typeSelect
}) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { isOverlay, type } = useSelector((state) => state.filter);

  const handleShowDroplist = () => {
    dispatch(setType(typeSelect));
    dispatch(showOverlay());
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(hiddenOverlay());
    query();
  };

  return (
    <>
      <div className={styles.dropdown} style={selectStyle}>
        <button onClick={handleShowDroplist}>{value || buttonText}</button>
        <ul
          style={listStyle}
          className={
            isOverlay && type === /* 'list' */typeSelect
              ? `${styles.list} ${styles.list_visible}`
              : `${styles.list}`
          }
        >
          <li style={ optionStyle } value="2023" onClick={handleChange}>
            2023
          </li>
          <li style={ optionStyle } value="2024" onClick={handleChange}>
            2024
          </li>
          <li style={ optionStyle } value="2025" onClick={handleChange}>
            2025
          </li>
          <li style={ optionStyle } value="2026" onClick={handleChange}>
            2026
          </li>
        </ul>
      </div>
      <div
        onClick={() => dispatch(hiddenOverlay())}
        className={
          isOverlay && type === /* 'list' */typeSelect
            ? `${styles.overlay} ${styles.overlay_active}`
            : `${styles.overlay}`
        }
      ></div>
    </>
  );
}

export default Select;
