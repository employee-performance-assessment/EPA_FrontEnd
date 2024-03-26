import './MenuEmployee.scss';
import { Link } from 'react-router-dom';

function MenuEmployee() {
  return (
    <ul className="side-menu__list">
      <Link
        to="/#"
        className="side-menu__item side-menu__item_personal"
      >
        <p className="side-menu__text">Личный кабинет</p>
      </Link>
      <Link
        to="/#"
        className="side-menu__item side-menu__item_kanban"
      >
        <p className="side-menu__text">Канбан доска</p>
      </Link>
      <Link
        to="/#"
        className="side-menu__item side-menu__item_asses"
      >
        <p className="side-menu__text">Оценить коллегу</p>
      </Link>
      <Link
        to="/#"
        className="side-menu__item side-menu__item_analytics"
      >
        <p className="side-menu__text"> Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuEmployee;
