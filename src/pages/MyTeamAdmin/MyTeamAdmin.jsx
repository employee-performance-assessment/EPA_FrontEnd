import './MyTeamAdmin.scss';
import { useEffect, useState } from 'react';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import EmptyList from '../../images/EmptyList.png';
import UsersThree from '../../images/UsersThree.svg';
import PlusIcon from '../../images/Plus.svg';
import { getAllUsers } from '../../utils/mainApi.js';
import AddUserForm from '../../components/AddUserForm/AddUserForm.jsx';

function MyTeamAdmin() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);

  const handleOpenAddEmployeeForm = () => {
    setIsAddEmployeePopupOpen(true);
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
        .catch((err) => alert(err));
    }
  }, [setEmployeeList]);

  return (
    <section className="my-team">
      {isAddEmployeePopupOpen && (
        <AddUserForm setIsAddEmployeePopupOpen={setIsAddEmployeePopupOpen} />
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
              <></>
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

export default MyTeamAdmin;
