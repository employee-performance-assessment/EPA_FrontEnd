import { useState } from 'react';
import IconDots from '../../images/3dots.svg';
import './EmployeeProfileCard.scss';

function EmployeeProfileCard({ user, setIsEditEmployeePopupOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openEditEmployeePopup = () => {
    setIsEditEmployeePopupOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="profile-card">
      <div className="profile-card__name-block">
        <p className="profile-card__name">{user.fullName}</p>
        <p className="profile-card__job-title">/ {user.position}</p>
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
            // onClick={() => console.log("Go to profile page clicked")}
          >
            Перейти в ЛК
          </button>
          <button
            className="profile-card__menu-option"
            // onClick={() => console.log("Delete clicked")}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfileCard;
