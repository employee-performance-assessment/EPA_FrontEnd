import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard.jsx';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import styles from './EmployeeViewBlock.module.scss';

function EmployeeViewBlock({ tasks, marks }) {
  const [newTasks, setNewTasks] = useState([]);
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const { ratingCards, taskCards } = ENDPOINT_ROUTES;
  const navigate = useNavigate();

  useEffect(() => {
    if(tasks) {
      setNewTasks(tasks.filter((task) => task.status === "NEW"))
    }
  }, [tasks])

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
        newTasks.map((task) => (
          <EmployeeViewCard
            type="tasks"
            key={task.id}
            title={task.name}
            deadline={task.deadline}
            penaltyPoints={task.penaltyPoints}
            points={task.basicPoints}
            handleClickTasks={handleClickTasks}
          />
        ))
      }
    </ul>
  );
}

export default EmployeeViewBlock;
