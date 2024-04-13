import { Link, useLocation } from 'react-router-dom';
import { ENDPOINT_ROUTES } from '../../../constants/constantsEndpointRoute';
import '../MenuAdmin/MenuAdmin.scss';

function MenuEmployee() {
  const {
    userArea,
    taskCards,
    ratingCards,
    board,
    estimate,
    questionnaire,
    analytics
  } = ENDPOINT_ROUTES;

  const { pathname } = useLocation();

  const isPersonalArea = pathname.includes(userArea) ||
    pathname.includes(taskCards) ||
    pathname.includes(ratingCards);
  const isBoard = pathname.includes(board);
  const isEstimate = pathname.includes(estimate) ||
    pathname.includes(questionnaire);
  const isAnalytics = pathname.includes(analytics);

  return (
    <ul className="menu">
      <Link to={userArea} className="menu__item">
        <div className={`menu__icon menu__icon-personal
          ${isPersonalArea && 'menu__icon-personal_active'}`} />
        <p className={`menu__text ${isPersonalArea && 'menu__text_active'}`}>Личный кабинет</p>
      </Link>
      <Link to={board} className="menu__item">
        <div className={`menu__icon menu__icon-kanban
          ${isBoard && 'menu__icon-kanban_active'}`} />
        <p className={`menu__text ${isBoard && 'menu__text_active'}`}>Канбан доска</p>
      </Link>
      <Link to={estimate} className="menu__item">
        <div className={`menu__icon menu__icon-assessments
          ${isEstimate && 'menu__icon-assessments_active'}`} />
        <p className={`menu__text ${isEstimate && 'menu__text_active'}`}>Оцени коллегу</p>
      </Link>
      <Link to={analytics} className="menu__item">
        <div className={`menu__icon menu__icon-analytics
          ${isAnalytics && 'menu__icon-analytics_active'}`} />
        <p className={`menu__text ${isAnalytics && 'menu__text_active'}`}>Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuEmployee;
