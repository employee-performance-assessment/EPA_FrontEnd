import UserForm from '../UserForm/UserForm.jsx';
import './AddUserForm.scss';

function AddUserForm() {
  const handleRegisterEmployee = (e) => {
    e.preventDefault();
    alert('You have successfully added new  employee');
  };

  return (
    <section className="addUserForm">
      <UserForm formTitle='Регистрация сотрудника' handleSubmit={handleRegisterEmployee} passwordPlaceholder='Пароль авторизации' />
    </section>
  );
}

export default AddUserForm;
