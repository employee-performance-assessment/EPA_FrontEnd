import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard';
import './SearchedTasks.scss';

function SearchedTasks({ tasks }) {
  return (
    <ul className="searchedTasks">
      <h3 className="searchedTasks__title">Результаты поиска:</h3>
      {tasks.length ? (
        tasks.map((task) => (
          <EmployeeViewCard type="tasks" key={task.id} task={task} />
        ))
      ) : (
        <div className='searchedTasks__empty-block'>
          <h4 className="searchedTasks__subtitle">
            По вашему запросу задачи не найдены
          </h4>
          <p className='searchedTasks__text'>Попробуйте изменить текст запроса</p>
        </div>
      )}
    </ul>
  );
}

export default SearchedTasks;
