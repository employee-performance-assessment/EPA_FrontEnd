import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard.jsx';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './EmployeeViewBlock.module.scss';

function EmployeeViewBlock({ tasks, marks }) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const { ratingCards, taskCards } = ENDPOINT_ROUTES;
  const navigate = useNavigate();

  function handleClickMarks() {
    navigate(ratingCards);
  }

  function handleClickTasks() {
    navigate(taskCards);
  }

  return (
    <ul className={styles.employeeViewBlock__list}>
      {viewMarks ?
        marks.map((card) => (
          <EmployeeViewCard
            type="marks"
            key={card.id}
            month={card.month}
            date={card.date}
            rating={card.rating}
            handleClickMarks={handleClickMarks}
          />
        )) :
        tasks.map((task) => (
          <EmployeeViewCard
            type="tasks"
            key={task.id}
            task={task}
            // title={task.name}
            // deadline={task.deadline}
            // penaltyPoints={task.penaltyPoints}
            // points={task.basicPoints}
            handleClickTasks={handleClickTasks}
          />
        ))
      }
    </ul>
  );
}

export default EmployeeViewBlock;
