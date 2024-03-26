import EmployeeProfileCard from '../EmployeeProfileCard/EmployeeProfileCard.jsx';
import './EmployeeList.scss';

function EmployeeList({ employeeList, handleOpenEditEmployeeForm }) {
  return (
    <section className="employeeList">
      {employeeList.map((employee) => (
        <EmployeeProfileCard
          user={employee}
          key={employee.id}
          handleOpenEditEmployeeForm={handleOpenEditEmployeeForm}
        />
      ))}
    </section>
  );
}

export default EmployeeList;
