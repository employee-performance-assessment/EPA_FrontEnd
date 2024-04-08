import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ENDPOINT_ROUTES } from '../../../constants/constantsEndpointRoute';
import './MenuAdmin.scss';

function MenuAdmin() {
  const {
    personalArea,
    criteria,
    myTeam,
    cardsEmployees,
    taskCards,
    ratingCards,
    board,
    estimate,
    questionnaire,
    analytics
  } = ENDPOINT_ROUTES;

  const { pathname } = useLocation();
  const [isPersonalArea, setIsPersonalArea] = useState(false);
  const [isMyTeam, setIsMyTeam] = useState(false);
  const [isBoard, setIsBoard] = useState(false);
  const [isEstimate, setIsEstimate] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false);

  useEffect(() => {
    pathname.includes(personalArea) ||
      pathname.includes(criteria) ?
      setIsPersonalArea(true) : setIsPersonalArea(false);

    pathname.includes(myTeam) ||
      pathname.includes(cardsEmployees) ||
      pathname.includes(taskCards) ||
      pathname.includes(ratingCards) ?
      setIsMyTeam(true) : setIsMyTeam(false);

    pathname.includes(board) ?
      setIsBoard(true) : setIsBoard(false);

    pathname.includes(estimate) ||
      pathname.includes(questionnaire) ?
      setIsEstimate(true) : setIsEstimate(false);

    pathname.includes(analytics) ?
      setIsAnalytics(true) : setIsAnalytics(false);
  }, [pathname]);

  return (
    <ul className="side-menu__list">
      <Link to={personalArea} className="side-menu__item">
        <div className={`side-menu__icon side-menu__icon-personal
          ${isPersonalArea && 'side-menu__icon-personal_active'}`} />
        <p className={`side-menu__text ${isPersonalArea && 'side-menu__text_active'}`}>Личный кабинет</p>
      </Link>
      <Link to={myTeam} className="side-menu__item">
        <div className={`side-menu__icon side-menu__icon-my-team
          ${isMyTeam && 'side-menu__icon-my-team_active'}`} />
        <p className={`side-menu__text ${isMyTeam && 'side-menu__text_active'}`}>Моя команда</p>
      </Link>
      <Link to={board} className="side-menu__item">
        <div className={`side-menu__icon side-menu__icon-kanban
          ${isBoard && 'side-menu__icon-kanban_active'}`} />
        <p className={`side-menu__text ${isBoard && 'side-menu__text_active'}`}>Канбан доска</p>
      </Link>
      <Link to={estimate} className="side-menu__item">
        <div className={`side-menu__icon side-menu__icon-assessments
          ${isEstimate && 'side-menu__icon-assessments_active'}`} />
        <p className={`side-menu__text ${isEstimate && 'side-menu__text_active'}`}>Оценка ЭС</p>
      </Link>
      <Link to={analytics} className="side-menu__item">
        <div className={`side-menu__icon side-menu__icon-analytics
          ${isAnalytics && 'side-menu__icon-analytics_active'}`} />
        <p className={`side-menu__text ${isAnalytics && 'side-menu__text_active'}`}>Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuAdmin;
