import styles from './EmployeeViewBlock.module.scss';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard.jsx';

function EmployeeViewBlock({ view, tasks, marks }) {
  return (
    <ul className={styles.employeeViewBlock__list}>
      {/* Текст карточек пока приходит из json */}
      {!view ?
        tasks.map((card) => (
          <EmployeeViewCard
            type="tasks"
            key={card.id}
            title={card.title}
            deadline={card.deadline}
            terms={card.terms}
            points={card.points}
          />
        )) :
        marks.map((card) => (
          <EmployeeViewCard
            type="marks"
            key={card.id}
            month={card.month}
            date={card.date}
            rating={card.rating}
          />
        ))
      }
    </ul>
  );
}

export default EmployeeViewBlock;
