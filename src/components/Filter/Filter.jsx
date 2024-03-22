import { useState } from 'react';
import Select from 'react-select';

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'inWork', label: 'В работе' },
    { value: 'inReview', label: 'На ревью' },
    { value: 'done', label: 'Выполнено' },
  ];

  const placeholder = 'К выполнению';

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#fff',
      color: '#333232',
      width: '196px',
      height: '40px',
      borderRadius: '10px',
      border: 'none',
      outline: 'none',
      boxShadow: state.isFocused ? 'none' : 'none',
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      height: '40px',
      lineheight: '150%',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'left',
      padding: '9px 16px',
      color: '#333232',
      '&:hover': {
        backgroundColor: '#C5B6F1',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#333232',
      fontSize: '16px',
      fontWeight: '500',
      margin: '0px',
      padding: '9px 20px',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '4px',
      width: '196px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#333232',
      padding: '10px',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform 0.3s ease',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333232',
      fontSize: '16px',
      fontWeight: '500',
      margin: '0px',
      padding: '9px 20px',
      textAlign: 'left',
    }),
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      isSearchable={false}
    />
  );
};

export default CustomSelect;
