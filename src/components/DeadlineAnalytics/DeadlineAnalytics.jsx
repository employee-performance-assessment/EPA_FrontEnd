import { useState } from 'react';
import { useSelector } from 'react-redux';
import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import BarChart from '../BarChart/BarChart';
import './DeadlineAnalytics.scss';

export function DeadlineAnalytics() {
  const currentYear = new Date().getFullYear();
  const isAdmin = useSelector((state => state.user.isAdmin));
  const [isPrivate, setIsPrivate] = useState(true);
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
          setIsChecked={setIsPrivate} />
        <div className='deadline-filter__date'>
          <Select
            typeSelect="year"
            list={['2023', '2024', '2025', '2026']}
            buttonText={selectedListYear}
            selectStyle='deadline-filter__year-select'
            buttonStyle='deadline-filter__year-button'
            listStyle='deadline-filter__year-ul'
            optionStyle='deadline-filter__year-list'
            query={handleSubmitYear} />
          <Select
            typeSelect="month"
            list={['Январь', 'Февраль', 'Март', 'Апрель']}
            buttonText="Месяц"
            selectStyle='deadline-filter__month-select'
            buttonStyle='deadline-filter__month-button'
            listStyle='deadline-filter__month-ul'
            optionStyle='deadline-filter__month-list' />
          <button className='deadline-filter__submit'>Показать</button>
        </div>
      </div>
      {isPrivate && <DeadlineDesignations />}
      <div className={`deadline-data ${isPrivate && 'deadline-data_private'}`}>
        {isPrivate ? (
          <>
            <div className='deadline-data__private-item'>
              <div className='deadline-data__head'>
                <div className='deadline-data__head-icon' />
                <span className='deadline-data__head-name'>Vasja Pupkin Frunsuncevich</span>
                <div className='deadline-data__head-job'>Developer</div>
              </div>
              <BarChart
                completed={completedResult}
                failure={failureResult}
              />
            </div>
            <div className='deadline-data__private-item'>
            <div className='deadline-data__head'>
                <div className='deadline-data__head-icon' />
                <span className='deadline-data__head-name'>Vasja Pupkin</span>
                <div className='deadline-data__head-job'>Developer</div>
              </div>
              <BarChart
                completed={completedResult}
                failure={failureResult}
              />
            </div>
            <div className='deadline-data__private-item'>
            <div className='deadline-data__head'>
                <div className='deadline-data__head-icon' />
                <span className='deadline-data__head-name'>Vasja Pupkin</span>
                <div className='deadline-data__head-job'>Developer</div>
              </div>
              <BarChart
                completed={completedResult}
                failure={failureResult}
              />
            </div>
          </>
        ) : (
          <div className='deadline-command'>
            <div className='deadline-command__graph-container'>
              <h2 className='deadline-command__title'>Команда</h2>
              <BarChart
                completed={completedResult}
                failure={failureResult} />
              <DeadlineDesignations />
            </div>
            {isAdmin &&
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
              </div>}
          </div>
        )}
      </div>
    </>
  );
}

export default DeadlineAnalytics;
