import './EmployeeCardsInTeamDeadlines.scss';

function EmployeeCardsInTeamDeadlines({ employee, iconStyle }) {
  return (
    <div className='deadline-command__employee' key={employee.id}>
      <div className={`deadline-command__employee-icon ${iconStyle}`} />
      <p className='deadline-command__employee-name'>{employee.fullName}</p>
    </div>
  );
}

export default EmployeeCardsInTeamDeadlines;
