// import { useEffect, useState } from 'react';
import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import EmployeeCardsInTeamDeadlines from '../EmployeeCardsInTeamDeadlines/EmployeeCardsInTeamDeadlines';
import EmployeeCardsIndividualDeadlines from '../EmployeeCardsIndividualDeadlines/EmployeeCardsIndividualDeadlines';
import BarChart from '../BarChart/BarChart';
import PictureNoData from '../PictureNoData/PictureNoData';
// import getNameMonth from '../../utils/getNameMonth';
// import months from '../../constants/months';
import {
  // getDataIndividualDeadlinesAdmin,
  // getDataTeamDeadlinesAdmin,
  // getListMonthsDeadlineAdmin,
  // getListYearsDeadlineAdmin
} from '../../utils/mainApi';
import './AdminDeadlines.scss';

function AdminDeadlines({
  isPrivate,
  employeesLoaded,
  employeeDataLoaded,
  employees,
  completedPercent,
  delayedPercent,
  leaders,
  violators
 }) {
  // const [selectedListYear, setSelectedListYear] = useState('Год');
  // const [selectedListMonth, setSelectedListMonth] = useState('Месяц');
  // const [listYears, setListYears] = useState([]);
  // const [listMonths, setListMonths] = useState([]);
  // const [completedPercent, setCompletedPercent] = useState(0);
  // const [delayedPercent, setDelayedPercent] = useState(0);
  // const [leaders, setLeaders] = useState([]);
  // const [violators, setViolators] = useState([]);
  // const [employees, setEmployees] = useState([]);
  // const employeesLoaded = employees[0];
  // const employeeDataLoaded = !!completedPercent || !!delayedPercent;

  // useEffect(() => {
  //   if (!listYears[0]) {
  //     setLoading(true);
  //     getListYearsDeadlineAdmin()
  //       .then((res) => {
  //         setListYears(res.reverse());
  //       })
  //       .catch((err) => handleError(err))
  //       .finally(() => setLoading(false));
  //   }
  // }, [])

  // useEffect(() => {
  //   if (selectedListYear !== 'Год' || selectedListMonth !== 'Месяц') {
  //     handleSubmitFilter();
  //   }
  // }, [isPrivate])

  // const handleSubmitYear = (evt) => {
  //   const selectedYear = evt.target.value;
  //   setSelectedListYear(selectedYear);
  //   setSelectedListMonth('Месяц');

  //   getListMonthsDeadlineAdmin(selectedYear)
  //     .then((res) => {
  //       setListMonths(res.map((item) => getNameMonth(item)).reverse());
  //     })
  //     .catch((err) => handleError(err))
  //     .finally(() => setLoading(false));
  // };

  // const handleSubmitMonth = (evt) => {
  //   const selectedMonth = evt.target.id;
  //   setSelectedListMonth(selectedMonth);
  // }

  // const handleSubmitFilter = () => {
  //   if (selectedListYear === 'Год' || selectedListMonth === 'Месяц') return;

  //   if (!isPrivate) {
  //     setLoading(true);
  //     getDataTeamDeadlinesAdmin(selectedListYear, getNumberMonth(selectedListMonth))
  //       .then((res) => {
  //         if (res.completedOnTimePercent && res.delayedPercent) {
  //           setCompletedPercent(res.completedOnTimePercent);
  //           setDelayedPercent(res.delayedPercent);
  //         }

  //         if (res.leaders) {
  //           setLeaders(res.leaders);
  //         }

  //         if (res.deadlineViolators) {
  //           setViolators(res.deadlineViolators);
  //         }
  //       })
  //       .catch((err) => handleError(err))
  //       .finally(() => setLoading(false));
  //   }

  //   if (isPrivate) {
  //     setLoading(true);
  //     getDataIndividualDeadlinesAdmin(selectedListYear, getNumberMonth(selectedListMonth))
  //       .then((res) => {
  //         setEmployees(res);
  //       })
  //       .catch((err) => handleError(err))
  //       .finally(() => setLoading(false));
  //   }
  // }

  // function getNumberMonth(name) {
  //   return months.indexOf(name) + 1;
  // }

  return (
    <>
      {isPrivate && employeesLoaded && <DeadlineDesignations />}
      <div className={`deadline-data
        ${isPrivate && 'deadline-data_private'}
        ${!employeesLoaded && isPrivate && 'deadline-data_individual'}
        ${!employeesLoaded && !employeeDataLoaded && 'deadline-data_empty'}`}>
        {isPrivate ? (
          <>
            {employeesLoaded ? (
              employees.map((employee) => (
                <EmployeeCardsIndividualDeadlines
                  key={employee.employeeId}
                  fullName={employee.employeeFullName}
                  position={employee.employeePosition}
                  completed={employee.completedOnTimePercent}
                  delayed={employee.delayedPercent}
                />
              ))
            ) : (
              <PictureNoData
                title='Чтобы просмотреть аналитику, выберите год и месяц, нажмите кнопку “Показать”'
              />)}
          </>
        ) : (
          <div className='deadline-command'>
            {completedPercent || delayedPercent || leaders[0] || violators[0] ? (
              <>
                <div className='deadline-command__graph-container'>
                  <h2 className='deadline-command__title'>Команда</h2>
                  <BarChart
                    completed={completedPercent}
                    failure={delayedPercent}
                  />
                  <DeadlineDesignations />
                </div>
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

export default AdminDeadlines;
