import EmployeeProfileCard from '../EmployeeProfileCard/EmployeeProfileCard.jsx';
import './EmployeeList.scss';

function EmployeeList({ employeeList, setIsEditEmployeePopupOpen }) {
  return (
    <section className="employeeList">
      {employeeList.map((employee) => (
        <EmployeeProfileCard
          user={employee}
          key={employee.id}
          setIsEditEmployeePopupOpen={setIsEditEmployeePopupOpen}
        />
      ))}
    </section>
  );
}

export default EmployeeList;
