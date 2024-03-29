import { useNavigate } from 'react-router-dom';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard.jsx';
import styles from './EmployeeViewBlock.module.scss';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function EmployeeViewBlock({ view, tasks, marks }) {
  const { viewRating, viewTask } = ENDPOINT_ROUTES;
  const navigate = useNavigate();

  function handleClickMarks() {
    navigate(viewRating);
  }

  function handleClickTasks() {
    navigate(viewTask);
  }

  return (
    <ul className={styles.employeeViewBlock__list}>
      {/* Текст карточек пока приходит из json */}
      {view
        ? marks.map((card) => (
            <EmployeeViewCard
              type="marks"
              key={card.id}
              date={card.date}
              rating={card.rating}
              handleClickMarks={handleClickMarks}
            />
        ))
        : tasks.map((card) => (
            <EmployeeViewCard
              type="tasks"
              key={card.id}
              title={card.title}
              deadline={card.deadline}
              terms={card.terms}
              points={card.points}
              handleClickTasks={handleClickTasks}
            />
        ))}
    </ul>
  );
}

export default EmployeeViewBlock;
