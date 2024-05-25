import BarChart from '../BarChart/BarChart';
import './EmployeeCardsIndividualDeadlines.scss';

function EmployeeCardsIndividualDeadlines({ fullName, position, completed, delayed }) {
  return (
    <div className='deadline-card__individual-item'>
      <div className='deadline-card__head'>
        <div className='deadline-card__head-icon' />
        <span className='deadline-card__head-name'>{fullName}</span>
        <span className='deadline-card__head-job'>{position}</span>
      </div>
      <BarChart
        completed={completed}
        delayed={delayed}
      />
    </div>
  );
}

export default EmployeeCardsIndividualDeadlines;