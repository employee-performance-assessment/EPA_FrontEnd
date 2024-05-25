import DeadlineDesignations from "../DeadlineDesignations/DeadlineDesignations";
import BarChart from '../BarChart/BarChart';
import PictureNoData from '../PictureNoData/PictureNoData';
import '../DeadlinesAdmin/AdminDeadlines.scss';

function UserDeadlines({
  isPrivate,
  employeesLoaded,
  employeeDataLoaded,
  completedPercent,
  delayedPercent,
  user,
  noData
}) {

  return (
    <div className={`deadline-container
        ${!employeesLoaded && isPrivate && 'deadline-container_individual'}
        ${!employeesLoaded && !employeeDataLoaded && 'deadline-container_empty'}`}>
      {isPrivate ? (
        <>
          {employeeDataLoaded ?
            (<>
              <div className='deadline-user-header'>
                <div className='deadline-user-header__icon' />
                <span className='deadline-user-header__name'>{user.fullName}</span>
              </div>
              <BarChart
                completed={completedPercent}
                delayed={delayedPercent}
              />
              <DeadlineDesignations />
            </>
            ) : (
              <PictureNoData
                title={`${noData ?
                  'Данных для аналитики ещё нет.' :
                  'Чтобы просмотреть аналитику, выберите год и месяц, нажмите кнопку “Показать”'
                  }`}
              />
            )
          }
        </>
      ) : (
        <div className='deadline-command'>
          {completedPercent || delayedPercent ? (
            <div className='deadline-command__graph-container deadline-command__graph-container_user'>
              <h2 className='deadline-command__title'>Команда</h2>
              <BarChart
                completed={completedPercent}
                delayed={delayedPercent}
              />
              <DeadlineDesignations />
            </div>
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
  );
}

export default UserDeadlines;
