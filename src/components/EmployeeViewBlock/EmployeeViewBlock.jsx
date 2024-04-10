import { useSelector } from 'react-redux';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard';
import styles from './EmployeeViewBlock.module.scss';

function EmployeeViewBlock({ tasks, marks, employeeId }) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  return (
    <ul className={styles.employeeViewBlock__list}>
      {viewMarks
        ? marks.map((card) => (
            <EmployeeViewCard
              type="marks"
              key={card.idQuestionnaire}
              idQuestionnaire={card.idQuestionnaire}
              date={card.createQuestionnaire}
              rating={card.middleScore}
              employeeId={employeeId}
            />
          ))
        : tasks &&
          tasks.map((task) => (
            <EmployeeViewCard type="tasks" key={task.id} task={task} />
          ))}
    </ul>
  );
}

export default EmployeeViewBlock;
