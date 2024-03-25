import tasks from './tasks.json';
import marks from './marks.json';
import styles from './EmployeeViewBlock.module.scss';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard.jsx';

function EmployeeViewBlock() {
  return (
    <ul className={styles.employeeViewBlock__list}>
      {/* Текст карточек пока приходит из json */}
      {tasks.map((card) => (
        <EmployeeViewCard
          type="tasks"
          key={card.id}
          title={card.title}
          deadline={card.deadline}
          terms={card.terms}
          rating={card.rating}
        />
      ))}

      {marks.map((card) => (
        <EmployeeViewCard
          type="marks"
          key={card.id}
          month={card.month}
          date={card.date}
        />
      ))}
    </ul>
  );
}

export default EmployeeViewBlock;
