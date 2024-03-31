import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconDots from '../../images/3dots.svg';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import './EmployeeProfileCard.scss';

function EmployeeProfileCard({ user, handleOpenEditEmployeeForm, handleDeleteEmployee }) {
  const { cardsEmployees } = ENDPOINT_ROUTES;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openEditEmployeePopup = () => {
    handleOpenEditEmployeeForm(user);
    setIsMenuOpen(false);
  };

  const deleteUser = () => {
    handleDeleteEmployee(user.id);
  };

  return (
    <div className="profile-card">
      <div className="profile-card__info-block">
        <div className='profile-card__name-block'>
          <p className="profile-card__name">{user.fullName}</p>
        </div>
        <div className='profile-card__position-block'>
          <p className="profile-card__position">/ {user.position}</p>
        </div>
      </div>
      <div className="profile-card__email">{user.email}</div>
      <div className="profile-card__menu">
        <img
          src={IconDots}
          alt="Кнопка действия"
          className="profile-card__menu-icon"
          onClick={openMenu}
        />
      </div>
      {isMenuOpen && (
        <div className="profile-card__menu-options">
          <button
            className="profile-card__menu-option"
            onClick={openEditEmployeePopup}
          >
            Редактировать
          </button>
          <button
            className="profile-card__menu-option"
            onClick={() => navigate(`${cardsEmployees}/${user.id}`)}
          >
            Перейти в ЛК
          </button>
          <button
            className="profile-card__menu-option"
            onClick={deleteUser}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfileCard;
