import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import EmployeeCardsInTeamDeadlines from '../EmployeeCardsInTeamDeadlines/EmployeeCardsInTeamDeadlines';
import EmployeeCardsIndividualDeadlines from '../EmployeeCardsIndividualDeadlines/EmployeeCardsIndividualDeadlines';
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import BarChart from '../BarChart/BarChart';
import PictureNoData from '../PictureNoData/PictureNoData';
import getNameMonth from '../../utils/getNameMonth';
import {
  getDataIndividualDeadlines,
  getDataTeamDeadlines,
  getListMonthsDeadline,
  getListYearsDeadline
} from '../../utils/mainApi';
import './DeadlineAnalytics.scss';

function DeadlineAnalytics({ setLoading, handleError }) {
  const isAdmin = useSelector((state => state.user.isAdmin));
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedListYear, setSelectedListYear] = useState('Год');
  const [selectedListMonth, setSelectedListMonth] = useState('Месяц');
  const [listYears, setListYears] = useState([]);
  const [listMonths, setListMonths] = useState([]);
  const [completedPercent, setCompletedPercent] = useState(0);
  const [delayedPercent, setDelayedPercent] = useState(0);
  const [leaders, setLeaders] = useState([]);
  const [violators, setViolators] = useState([]);
  const [employees, setEmployees] = useState([]);
  const employeesLoaded = employees[0];

  useEffect(() => {
    if (!listYears[0]) {
      setLoading(true);
      getListYearsDeadline()
        .then((res) => {
          setListYears(res.reverse());
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }
  }, [])

  useEffect(() => {
    if (selectedListYear !== 'Год' || selectedListMonth !== 'Месяц') {
      handleSubmitFilter();
    }
  }, [isPrivate])

  const handleSubmitYear = (evt) => {
    const selectedYear = evt.target.value;
    setSelectedListYear(selectedYear);
    setSelectedListMonth('Месяц');

    getListMonthsDeadline(selectedYear)
      .then((res) => {
        setListMonths(res.map((item) => getNameMonth(item)).reverse());
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  };

  const handleSubmitMonth = (evt) => {
    const selectedMonth = evt.target.id;
    setSelectedListMonth(selectedMonth);
  }

  const handleSubmitFilter = () => {
    if (!isPrivate) {
      setLoading(true);
      getDataTeamDeadlines(selectedListYear, getNumberMonth(selectedListMonth))
        .then((res) => {
          if (res.completedOnTimePercent && res.delayedPercent) {
            setCompletedPercent(res.completedOnTimePercent);
            setDelayedPercent(res.delayedPercent);
          }

          if (res.leaders) {
            setLeaders(res.leaders);
          }

          if (res.deadlineViolators) {
            setViolators(res.deadlineViolators);
          }
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      getDataIndividualDeadlines(selectedListYear, getNumberMonth(selectedListMonth))
        .then((res) => {
          setEmployees(res);
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }
  }

  function getNumberMonth(name) {
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    return months.indexOf(name) + 1;
  }

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
            typeSelect="year"
            list={listYears}
            buttonText={selectedListYear}
            selectStyle='deadline-filter__year-select'
            buttonStyle='deadline-filter__year-button'
            listStyle='deadline-filter__year-ul'
            optionStyle='deadline-filter__year-list'
            query={handleSubmitYear}
          />
          <Select
            typeSelect="month"
            list={listMonths}
            buttonText={selectedListMonth}
            selectStyle='deadline-filter__month-select'
            buttonStyle='deadline-filter__month-button'
            listStyle='deadline-filter__month-ul'
            optionStyle='deadline-filter__month-list'
            query={handleSubmitMonth}
          />
          <button className='deadline-filter__submit' onClick={handleSubmitFilter}>Показать</button>
        </div>
      </div>
      {isPrivate && employeesLoaded && <DeadlineDesignations />}
      <div className={`deadline-data ${isPrivate && 'deadline-data_private'} ${!employeesLoaded && 'deadline-data_empty'}`}>
        {isPrivate ? (
          <>
            {!employeesLoaded &&
              <PictureNoData
                title='Чтобы просмотреть аналитику, выберите год и месяц, нажмите кнопку “Показать”'
              />}
            {employees.map((employee) => (
              <EmployeeCardsIndividualDeadlines
                key={employee.employeeId}
                fullName={employee.employeeFullName}
                position={employee.employeePosition}
                completed={employee.completedOnTimePercent}
                delayed={employee.delayedPercent}
              />
            ))}
          </>
        ) : (
          <div className='deadline-command'>
            {completedPercent || delayedPercent || leaders[0] || violators[0] ? (
              <>
                <div className='deadline-command__graph-container'>
                  <h2 className='deadline-command__title'>Команда</h2>
                  <BarChart
                    completed={completedPercent}
                    failure={delayedPercent} />
                  <DeadlineDesignations />
                </div>
                {isAdmin &&
                  <div className='deadline-command__leaders-intruders'>
                    <div className='deadline-command__employees-container'>
                      <p className='deadline-command__employees-header'>Лидеры</p>
                      <div className='deadline-command__employees'>
                        {leaders.map((employee) => (
                          <EmployeeCardsInTeamDeadlines
                            key={employee.id}
                            employee={employee}
                            iconStyle='deadline-command__employee-icon_leader'
                          />))
                        }
                      </div>
                    </div>
                    <div className='deadline-command__employees-container'>
                      <p className='deadline-command__employees-header'>Нарушители дедлайна</p>
                      <div className='deadline-command__employees'>
                        {violators.map((employee) => (
                          <EmployeeCardsInTeamDeadlines
                            key={employee.id}
                            employee={employee}
                            iconStyle='deadline-command__employee-icon_intruder'
                          />))
                        }
                      </div>
                    </div>
                  </div>
                }
              </>
            ) : (
              <PictureNoData
                title='Чтобы просмотреть аналитику, выберите год и месяц, нажмите кнопку “Показать”'
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default DeadlineAnalytics;
