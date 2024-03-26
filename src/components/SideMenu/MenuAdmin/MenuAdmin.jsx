import { Link } from 'react-router-dom';
import { ENDPOINT_ROUTES } from '../../../constants/constantsEndpointRoute';
import './MenuAdmin.scss';

function MenuAdmin() {
  const {
    personalArea,
    myTeam,
    board,
    analytics,
    estimate
  } = ENDPOINT_ROUTES;

  return (
    <ul className="side-menu__list">
      <Link
        to={personalArea}
        className="side-menu__item side-menu__item_personal"
      >
        <p className="side-menu__text">Личный кабинет</p>
      </Link>
      <Link
        to={myTeam}
        className="side-menu__item side-menu__item_my-team"
      >
        <p className="side-menu__text">Моя команда</p>
      </Link>
      <Link
        to={board}
        className="side-menu__item side-menu__item_kanban"
      >
        <p className="side-menu__text">Канбан доска</p>
      </Link>
      <Link
        to={estimate}
        className="side-menu__item side-menu__item_asses"
      >
        <p className="side-menu__text">Оценка ЭС</p>
      </Link>
      <Link
        to={analytics}
        className="side-menu__item side-menu__item_analytics"
      >
        <p className="side-menu__text"> Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuAdmin;
