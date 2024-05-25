import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import EmployeeCardsInTeamDeadlines from '../EmployeeCardsInTeamDeadlines/EmployeeCardsInTeamDeadlines';
import EmployeeCardsIndividualDeadlines from '../EmployeeCardsIndividualDeadlines/EmployeeCardsIndividualDeadlines';
import BarChart from '../BarChart/BarChart';
import PictureNoData from '../PictureNoData/PictureNoData';
import './AdminDeadlines.scss';

function AdminDeadlines({
  isPrivate,
  employeesLoaded,
  employeeDataLoaded,
  employees,
  completedPercent,
  delayedPercent,
  leaders,
  violators,
  noData
}) {

  return (
    <>
      {isPrivate && employeesLoaded && <DeadlineDesignations />}
      <div className={`deadline-container
        ${isPrivate && 'deadline-container_private'}
        ${!employeesLoaded && !employeeDataLoaded && 'deadline-container_empty'}`}>
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
                title={`${noData ?
                  'Данных для аналитики ещё нет.' :
                  'Чтобы просмотреть аналитику, выберите год и месяц, нажмите кнопку “Показать”'
                  }`}
              />
            )}
          </>
        ) : (
          <div className='deadline-command'>
            {completedPercent || delayedPercent || leaders[0] || violators[0] ? (
              <>
                <div className='deadline-command__graph-container'>
                  <h2 className='deadline-command__title'>Команда</h2>
                  <BarChart
                    completed={completedPercent}
                    delayed={delayedPercent}
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
                title={`${noData ?
                  'Данных для аналитики ещё нет.' :
                  'Чтобы просмотреть аналитику, выберите год и месяц, нажмите кнопку “Показать”'
                  }`}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDeadlines;
