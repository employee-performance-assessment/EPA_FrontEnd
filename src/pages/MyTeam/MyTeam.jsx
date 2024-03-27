import './MyTeam.scss';
import { useEffect, useState } from 'react';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import EmptyList from '../../images/EmptyList.png';
import UsersThree from '../../images/UsersThree.svg';
import PlusIcon from '../../images/Plus.svg';
import { getAllUsers, deleteUser } from '../../utils/mainApi.js';
import AddUserForm from '../../components/AddUserForm/AddUserForm.jsx';
import EmployeeList from '../../components/EmployeeList/EmployeeList.jsx';
import EditEmployeeForm from '../../components/EditEmployeeForm/EditEmployeeForm.jsx';

function MyTeam() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);
  const [isEditEmployeePopupOpen, setIsEditEmployeePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenAddEmployeeForm = () => {
    setIsAddEmployeePopupOpen(true);
  };

  const handleOpenEditEmployeeForm = (user) => {
    setSelectedUser(user);
    setIsEditEmployeePopupOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setEmployeeList((prevList) =>
      prevList.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDeleteEmployee = (token, id) => {
    deleteUser(token, id).then(() => {
      setEmployeeList((prevList) => prevList.filter((user) => user.id !== id));
    });
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('token'));
    if (token) {
      getAllUsers(token)
        .then((res) => {
          if (res) {
            setEmployeeList(res);
          }
        })
        // eslint-disable-next-line no-alert
        .catch((err) => alert(err));
    }
  }, [setEmployeeList]);

  return (
    <section className="my-team">
      {isAddEmployeePopupOpen && (
        <AddUserForm setIsAddEmployeePopupOpen={setIsAddEmployeePopupOpen} />
      )}
      {isEditEmployeePopupOpen && (
        <EditEmployeeForm
          setIsEditEmployeePopupOpen={setIsEditEmployeePopupOpen}
          user={selectedUser}
          handleUpdateUser={handleUpdateUser}
        />
      )}
      <div className="my-team__wrapper">
        <div className="my-team__sidemenu">
          <SideMenu />
        </div>
        <div className="my-team__main">
          <nav className="my-team__nav">
            <div className="my-team__icon-block">
              <img
                src={UsersThree}
                alt="Иконка команды"
                className="my-team__icon"
              />
              <p className="my-team__label">Моя команда</p>
            </div>
            <button
              type="button"
              className="my-team__button"
              onClick={handleOpenAddEmployeeForm}
            >
              Добавить сотрудника
              <img
                src={PlusIcon}
                alt="Иконка добавления сотрудника"
                className="my-team__button-icon"
              />
            </button>
          </nav>
          <div className="my-team__content">
            {employeeList ? (
              <EmployeeList
                employeeList={employeeList}
                handleOpenEditEmployeeForm={handleOpenEditEmployeeForm}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            ) : (
              <div className="my-team__content_type_empty">
                <img
                  src={EmptyList}
                  alt=""
                  className="my-team__content-image"
                />
                <p>
                  Список пуст. <br /> Добавьте сотрудников в список.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyTeam;
