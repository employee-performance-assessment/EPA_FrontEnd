import Select from 'react-select';
import CustomArrow from '../CustomArrow/CustomArrow.jsx';

const Filter = ({ options, onChange, value, placeholder }) => {
  // в качестве options timeFrames или years, onChange: handleChangeTimeframe или handleChangeYear
  // value: один из стейтов, placeholder: "Год" или "Фильтры"
  // const [selectedTimeframe, setSelectedTimeframe] = useState('');
  // const [selectedYear, setSelectedYear] = useState('');

  // const handleChangeYear = (selectedValue) => {
  //   setSelectedYear(selectedValue);
  // };

  // const handleChangeTimeframe = (selectedValue) => {
  //   setSelectedTimeframe(selectedValue);
  // };

  // const timeFrames = [
  //   { value: 'week', label: 'Неделя' },
  //   { value: 'month', label: 'Месяц' },
  //   { value: 'halfYear', label: 'Полгода' },
  // ];

  // const years = [
  //   {value: '2024', label: "2024"},
  //   {value: '2023', label: "2023"},
  //   {value: '2022', label: "2022"},
  //   {value: '2021', label: "2021"},
  // ];

  const customStyles = {
    control: (provided) => {
      const customWidth = placeholder === 'Год' ? '121px' : '176px';

      return {
        ...provided,
        backgroundColor: 'black',
        color: 'white',
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
      backgroundColor: state.isFocused ? '#00D37F' : 'black',
      color: 'white',
      height: '38px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
      fontSize: '20px',
      margin: '0px',
    }),
    menu: (provided) => {
      const customWidth = placeholder === 'Год' ? '121px' : '176px';

      return {
        ...provided,
        width: customWidth,
        backgroundColor: 'black',
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
      color: 'white',
      fontSize: '20px',
    }),
  };

  const components = {
    DropdownIndicator: (props) => <CustomArrow {...props} />,
  };

  return (
    <Select
      value={options.find((option) => option.value === value)}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      isSearchable={false}
      components={components}
    />
  );
};

export default Filter;
