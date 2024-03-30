import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard.jsx';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './EmployeeViewBlock.module.scss';

function EmployeeViewBlock({ tasks, marks }) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
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
        tasks.map((card) => (
          <EmployeeViewCard
            type="tasks"
            key={card.id}
            title={card.title}
            deadline={card.deadline}
            terms={card.terms}
            points={card.points}
            handleClickTasks={handleClickTasks}
          />
        ))
      }
    </ul>
  );
}

export default EmployeeViewBlock;
