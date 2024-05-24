import BarChart from '../BarChart/BarChart';
import './EmployeeCardsIndividualDeadlines.scss';

function EmployeeCardsIndividualDeadlines({ fullName, position, completed, delayed }) {
  return (
    <div className='deadline-data__private-item'>
      <div className='deadline-data__head'>
        <div className='deadline-data__head-icon' />
        <span className='deadline-data__head-name'>{fullName}</span>
        <span className='deadline-data__head-job'>{position}</span>
      </div>
      <BarChart
        completed={completed}
        failure={delayed}
      />
    </div>
  );
}

export default EmployeeCardsIndividualDeadlines;