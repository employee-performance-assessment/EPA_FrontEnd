import { useState } from 'react';
import Select from 'react-select';
import CustomArrow from '../CustomArrow/CustomArrow.jsx';

const Filter = () => {
  // props: { options, onChange, value, placeholder }
  // в качестве options timeFrames или years, onChange: handleChangeTimeframe или handleChangeYear
  // value: один из стейтов, placeholder: "Год" или "Фильтры"
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  // const [selectedYear, setSelectedYear] = useState('');

  // const handleChangeYear = (selectedValue) => {
  //   setSelectedYear(selectedValue);
  // };

  const handleChangeTimeframe = (selectedValue) => {
    setSelectedTimeframe(selectedValue);
  };

  const timeFrames = [
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'halfYear', label: 'Полгода' },
  ];

  // const years = [
  //   {value: '2024', label: "2024"},
  //   {value: '2023', label: "2023"},
  //   {value: '2022', label: "2022"},
  //   {value: '2021', label: "2021"},
  // ];

  const placeholder = 'Фильтры'; // или 'Год'
  const options = timeFrames; // или years

  const customStyles = {
    control: (provided) => {
      const customWidth = placeholder === 'Год' ? '121px' : '176px';

      return {
        ...provided,
        backgroundColor: '#333232',
        color: '#fff',
        width: customWidth,
        height: '52px',
        borderRadius: '40px',
        boxShadow: 'none',
        border: 'none',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 26px',
      };
    },
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#00D37F' : '#333232',
      color: '#fff',
      height: '38px',
      fontSize: '16px',
      paddingLeft: '20px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '20px',
      margin: '0px',
    }),
    menu: (provided) => {
      const customWidth = placeholder === 'Год' ? '121px' : '176px';

      return {
        ...provided,
        width: customWidth,
        backgroundColor: '#333232',
        borderRadius: '18px',
        paddingTop: '12px',
        paddingBottom: '12px',
      };
    },
    menuList: (provided) => ({
      ...provided,
      padding: '0',
      overflow: 'hidden',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: () => null,
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '20px',
    }),
  };

  const components = {
    DropdownIndicator: (props) => <CustomArrow {...props} />,
  };

  return (
    <Select
      value={options.find((option) => option.value === selectedTimeframe)} // value вместо state
      onChange={(selectedOption) => handleChangeTimeframe(selectedOption.value)} // onChange func
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      isSearchable={false}
      components={components}
    />
  );
};

export default Filter;
