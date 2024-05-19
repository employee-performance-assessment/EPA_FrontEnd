import { useState } from 'react';
import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import './DeadlineAnalytics.scss';

function DeadlineAnalytics() {
  const currentYear = new Date().getFullYear();
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedListYear, setSelectedListYear] = useState(currentYear);
  const completedResult = 80;
  const failureResult = 20;
  const name = 'Alex Proscurjacovsckich';

  const handleSubmitYear = (evt) => {
    const selectedYear = evt.target.value;
    setSelectedListYear(selectedYear);
  };

  return (
    <>
      <div className='deadline-filter'>
        <Switch
          labelLeft="Командная"
          labelRight="Индивидуальная"
          isChecked={isPrivate}
          setIsChecked={setIsPrivate}
        />
        <div className='deadline-filter__date'>
          <Select
            typeSelect="month"
            list={['Январь', 'Февраль', 'Март', 'Апрель']}
            buttonText="Месяц"
            selectStyle='deadline-filter__month-select'
            buttonStyle='deadline-filter__month-button'
            listStyle='deadline-filter__month-ul'
            optionStyle='deadline-filter__month-list'
          />
          <Select
            typeSelect="year"
            list={['2023', '2024', '2025', '2026']}
            buttonText={selectedListYear}
            selectStyle='deadline-filter__year-select'
            buttonStyle='deadline-filter__year-button'
            listStyle='deadline-filter__year-ul'
            optionStyle='deadline-filter__year-list'
            query={handleSubmitYear}
          />
          <button className='deadline-filter__submit'>Показать</button>
        </div>
      </div>
      <div className='deadline-data'>
        {isPrivate ? (
          <div className='deadline-private'> </div>
        ) : (
          <div className='deadline-command'>
            <div className='deadline-command__graph-container'>
              <h2 className='deadline-command__title'>Команда</h2>
              <div className='deadline-command__graph'>
                <div className='deadline-command__completed' style={{ height: `${completedResult}%` }} />
                <div className='deadline-command__failure' style={{ height: `${failureResult}%` }} />
                <span className='deadline-command__completed-text'>{completedResult}%</span>
                <span className='deadline-command__failure-text'>{failureResult}%</span>
              </div>
              <DeadlineDesignations />
            </div>
            <div className='deadline-command__leaders-intruders'>
              <div className='deadline-command__employees-container'>
                <p className='deadline-command__employees-header'>Лидеры</p>
                <div className='deadline-command__employees'>
                  <div className='deadline-command__employee'>
                    <div className='deadline-command__employee-icon deadline-command__employee-icon_leader' />
                    <p className='deadline-command__employee-name'>{name}</p>
                  </div>
                  <div className='deadline-command__employee'>
                    <div className='deadline-command__employee-icon deadline-command__employee-icon_leader' />
                    <p className='deadline-command__employee-name'>{name}</p>
                  </div>
                </div>
              </div>
              <div className='deadline-command__employees-container'>
                <p className='deadline-command__employees-header'>Нарушители дедлайна</p>
                <div className='deadline-command__employee'>
                  <div className='deadline-command__employee-icon deadline-command__employee-icon_intruder' />
                  <p className='deadline-command__employee-name'>{name}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DeadlineAnalytics;
