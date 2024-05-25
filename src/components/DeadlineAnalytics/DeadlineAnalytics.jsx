import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import AdminDeadlines from '../DeadlinesAdmin/AdminDeadlines';
import UserDeadlines from '../UserDeadlines/UserDeadlines';
import getNameMonth from '../../utils/getNameMonth';
import months from '../../constants/months';
import {
  getDataIndividualDeadlinesAdmin,
  getDataIndividualUserDeadlines,
  getDataTeamDeadlinesAdmin,
  getDataTeamUserDeadlines,
  getListMonthsDeadlineAdmin,
  getListMonthsUserDeadline,
  getListYearsDeadlineAdmin,
  getListYearsUserDeadline
} from '../../utils/mainApi';
import './DeadlineAnalytics.scss';

function DeadlineAnalytics({ setLoading, handleError }) {
  const isAdmin = useSelector((state => state.user.isAdmin));
  const user = useSelector((state => state.user));
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
  const employeeDataLoaded = !!completedPercent || !!delayedPercent;
  const noData = !listYears[0];

  useEffect(() => {
    if (!listYears[0]) {
      if (isAdmin) {
        setLoading(true);
        getListYearsDeadlineAdmin()
          .then((res) => {
            setListYears(res.reverse());
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      } else {
        setLoading(true);
        getListYearsUserDeadline()
          .then((res) => {
            setListYears(res.reverse());
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      }
    }
  }, [isAdmin])

  useEffect(() => {
    if (selectedListYear !== 'Год' || selectedListMonth !== 'Месяц') {
      handleSubmitFilter();
    }
  }, [isPrivate])

  const handleSubmitYear = (evt) => {
    const selectedYear = evt.target.value;
    setSelectedListYear(selectedYear);
    setSelectedListMonth('Месяц');

    if (isAdmin) {
      getListMonthsDeadlineAdmin(selectedYear)
        .then((res) => {
          setListMonths(res.map((item) => getNameMonth(item)).reverse());
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    } else {
      getListMonthsUserDeadline(selectedYear)
        .then((res) => {
          setListMonths(res.map((item) => getNameMonth(item)).reverse());
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }
  };

  const handleSubmitMonth = (evt) => {
    const selectedMonth = evt.target.id;
    setSelectedListMonth(selectedMonth);
  }

  const handleSubmitFilter = () => {
    if (selectedListYear === 'Год' || selectedListMonth === 'Месяц') return;

    if (!isPrivate) {
      if (isAdmin) {
        setLoading(true);
        getDataTeamDeadlinesAdmin(selectedListYear, getNumberMonth(selectedListMonth))
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
        getDataTeamUserDeadlines(selectedListYear, getNumberMonth(selectedListMonth))
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
      }
    }

    if (isPrivate) {
      if (isAdmin) {
        setLoading(true);
        getDataIndividualDeadlinesAdmin(selectedListYear, getNumberMonth(selectedListMonth))
          .then((res) => {
            setEmployees(res);
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      } else {
        setLoading(true);
        getDataIndividualUserDeadlines(selectedListYear, getNumberMonth(selectedListMonth))
          .then((res) => {
            setCompletedPercent(res.completedOnTimePercent);
            setDelayedPercent(res.delayedPercent);
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      }
    }
  }

  function getNumberMonth(name) {
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
      {isAdmin ?
        <AdminDeadlines
          isPrivate={isPrivate}
          employeesLoaded={employeesLoaded}
          employeeDataLoaded={employeeDataLoaded}
          completedPercent={completedPercent}
          delayedPercent={delayedPercent}
          leaders={leaders}
          violators={violators}
          employees={employees}
          noData={noData}
        /> :
        <UserDeadlines
          isPrivate={isPrivate}
          employeesLoaded={employeesLoaded}
          employeeDataLoaded={employeeDataLoaded}
          completedPercent={completedPercent}
          delayedPercent={delayedPercent}
          user={user}
          noData={noData}
        />}
    </>
  );
}

export default DeadlineAnalytics;
