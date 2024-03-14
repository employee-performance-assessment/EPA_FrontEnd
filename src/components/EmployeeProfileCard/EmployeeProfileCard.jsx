import { useState } from 'react';
import IconDots from '../../images/3dots.svg';

function EmployeeProfileCard() {
  // props: {user}
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = {
    name: 'Иван Иванов',
    jobTitle: 'Разработчик',
    email: 'Ivan@mail.ru',
    password: 'Ivanco928',
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="profile-card">
      <div className="profile-card__info-block">
        <div className="profile-card__name-password">
          <p className="profile-card__name">{user.name}</p>
          <p className="profile-card__password">Пароль: {user.password}</p>
        </div>
        <p className="profile-card__job-title">/ {user.jobTitle}</p>
      </div>
      <div className="profile-card__email">{user.email}</div>
      <div className="profile-card__menu">
        <img
          src={IconDots}
          alt="Кнопка действия"
          className="profile-card__menu-icon"
          onClick={handleOpenMenu}
        />
      </div>
      {isMenuOpen && (
        <div className="profile-card__menu-options">
          <button
            className="profile-card__menu-option"
            // onClick={() => (console.log("Edit clicked")}
          >
            Редактировать
          </button>
          <button
            className="profile-card__menu-option"
            // onClick={() => console.log("Go to profile page clicked")}
          >
            Перейти в кабинет сотрудника
          </button>
          <button
            className="profile-card__menu-option"
            // onClick={() => console.log("Delete clicked")}
          >
            Удалить сотрудника
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfileCard;
