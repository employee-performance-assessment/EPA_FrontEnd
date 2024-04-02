import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ENDPOINT_ROUTES } from '../../../constants/constantsEndpointRoute';
import './MenuAdmin.scss';

function MenuAdmin() {
  const { personalArea, myTeam, board, analytics, estimate } = ENDPOINT_ROUTES;

  const { pathname } = useLocation();
  const [isMyTeam, setIsMyTeam] = useState(false);

  useEffect(() => {
    if (pathname.includes('cards-employees')) {
      setIsMyTeam(true);
    } else {
      setIsMyTeam(false);
    }
  }, [pathname]);

  return (
    <ul className="side-menu__list">
      <NavLink
        to={personalArea}
        className={({ isActive }) =>
          `side-menu__item side-menu__item-personal ${isActive && 'side-menu__item_active side-menu__item-personal_active'}`
        }
      >
        <p className="side-menu__text">Личный кабинет</p>
      </NavLink>
      <NavLink
        to={myTeam}
        className={({ isActive }) =>
          `side-menu__item side-menu__item-my-team ${isActive && 'side-menu__item_active side-menu__item-my-team_active'} ${isMyTeam && 'side-menu__item_active side-menu__item-my-team_active'}`
        }
      >
        <p className="side-menu__text">Моя команда</p>
      </NavLink>
      <NavLink
        to={board}
        className={({ isActive }) =>
          `side-menu__item side-menu__item-kanban ${isActive && 'side-menu__item_active side-menu__item-kanban_active'}`
        }
      >
        <p className="side-menu__text">Канбан доска</p>
      </NavLink>
      <NavLink
        to={estimate}
        className={({ isActive }) =>
          `side-menu__item side-menu__item-asses ${isActive && 'side-menu__item_active side-menu__item-asses_active'}`
        }
      >
        <p className="side-menu__text">Оценка ЭС</p>
      </NavLink>
      <NavLink
        to={analytics}
        className={({ isActive }) =>
          `side-menu__item side-menu__item-analytics ${isActive && 'side-menu__item_active side-menu__item-analytics_active'}`
        }
      >
        <p className="side-menu__text"> Аналитика</p>
      </NavLink>
    </ul>
  );
}

export default MenuAdmin;
