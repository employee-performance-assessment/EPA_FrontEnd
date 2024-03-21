import { Link } from 'react-router-dom';
import './MenuAdmin.scss';

function MenuAdmin() {
  return (
    <ul className="side-menu__list">
      <Link
        to="/#"
        target="_blank"
        className="side-menu__item side-menu__item_personal"
      >
        <p className="side-menu__text">Личный кабинет</p>
      </Link>
      <Link
        to="/#"
        target="_blank"
        className="side-menu__item side-menu__item_my-team"
      >
        <p className="side-menu__text">Моя команда</p>
      </Link>
      <Link
        to="/#"
        target="_blank"
        className="side-menu__item side-menu__item_kanban"
      >
        <p className="side-menu__text">Канбан доска</p>
      </Link>
      <Link
        to="/#"
        target="_blank"
        className="side-menu__item side-menu__item_asses"
      >
        <p className="side-menu__text">Оценка ЭС</p>
      </Link>
      <Link
        to="/#"
        target="_blank"
        className="side-menu__item side-menu__item_analytics"
      >
        <p className="side-menu__text"> Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuAdmin;
