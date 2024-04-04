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

    pathname.includes(estimate) ?
      setIsEstimate(true) : setIsEstimate(false);

    pathname.includes(analytics) ?
      setIsAnalytics(true) : setIsAnalytics(false);
  }, [pathname]);

  return (
    <ul className="side-menu__list">
      <Link
        to={personalArea}
        className={`side-menu__item side-menu__item-personal
        ${isPersonalArea && 'side-menu__item_active side-menu__item-personal_active'}`}
      >
        <p className="side-menu__text">Личный кабинет</p>
      </Link>
      <Link
        to={myTeam}
        className={`side-menu__item side-menu__item-my-team
        ${isMyTeam && 'side-menu__item_active side-menu__item-my-team_active'}`}
      >
        <p className="side-menu__text">Моя команда</p>
      </Link>
      <Link
        to={board}
        className={`side-menu__item side-menu__item-kanban
        ${isBoard && 'side-menu__item_active side-menu__item-kanban_active'}`}
      >
        <p className="side-menu__text">Канбан доска</p>
      </Link>
      <Link
        to={estimate}
        className={`side-menu__item side-menu__item-asses
        ${isEstimate && 'side-menu__item_active side-menu__item-asses_active'}`}
      >
        <p className="side-menu__text">Оценка ЭС</p>
      </Link>
      <Link
        to={analytics}
        className={`side-menu__item side-menu__item-analytics
        ${isAnalytics && 'side-menu__item_active side-menu__item-analytics_active'}`}
      >
        <p className="side-menu__text"> Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuAdmin;
