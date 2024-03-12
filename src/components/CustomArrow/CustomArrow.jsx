import React from 'react';
import customDropdownIndicator from '../../images/CaretDown.svg';

function CustomArrow({ selectProps }) {
  return (
    <div
      style={{
        backgroundImage: `url(${customDropdownIndicator})`,
        backgroundSize: 'cover',
        width: '24px',
        height: '24px',
        transform: `rotate(${selectProps.menuIsOpen ? '180deg' : '0deg'})`,
        transition: 'transform 0.2s ease',
      }}
    />
  );
}

export default CustomArrow;
