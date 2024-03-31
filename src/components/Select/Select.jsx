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
  typeSelect,
  list,
  buttonStyle,
}) {
  const [valueYear, setValueYear] = useState('');
  const [valueUser, setValueUser] = useState('');
  const dispatch = useDispatch();
  const { isOverlay, type } = useSelector((state) => state.filter);

  const handleShowDroplist = () => {
    dispatch(setType(typeSelect));
    dispatch(showOverlay());
  };

  const handleChange = (e) => {
    if (typeSelect === 'list') {
      setValueYear(e.target.value);
    } else if (typeSelect === 'users') {
      setValueUser(e.target.id);
    }
    dispatch(hiddenOverlay());
    query();
  };

  return (
    <>
      <div
        className={
          (typeSelect === 'list' && selectStyle) ||
          (typeSelect === 'users' && selectStyle)
        }
      >
        <button className={buttonStyle} onClick={handleShowDroplist}>
          {(typeSelect === 'list' && valueYear) ||
            (typeSelect === 'users' && valueUser) ||
            buttonText}
        </button>
        <ul
          className={
            isOverlay && type === typeSelect
              ? `${listStyle} ${styles.list_visible}`
              : `${listStyle}`
          }
        >
          {list.map((item, index) => (
            <li
              key={
                (typeSelect === 'list' && index) ||
                (typeSelect === 'users' && item.id)
              }
              className={optionStyle}
              value={
                (typeSelect === 'users' && item.fullName) ||
                (typeSelect === 'list' && item)
              }
              id={typeSelect === 'users' ? item.fullName : ''}
              onClick={handleChange}
            >
              {(typeSelect === 'list' && item) ||
                (typeSelect === 'users' && item.fullName)}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => dispatch(hiddenOverlay())}
        className={
          isOverlay && type === typeSelect
            ? `${styles.overlay} ${styles.overlay_active}`
            : `${styles.overlay}`
        }
       />
    </>
  );
}

export default Select;
