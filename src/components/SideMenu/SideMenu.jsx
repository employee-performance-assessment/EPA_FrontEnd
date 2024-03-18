import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo.jsx';
import './SideMenu.scss';
// import logo from '../../images/logo.svg';
import UserCircle from '../../images/UserCircle.svg';
import UserCircleActive from '../../images/UserCircle_active.svg';
import kanbanboard from '../../images/KanbanBoard.svg';
import assessment from '../../images/assessment.svg';
import analytics from '../../images/analytics.svg';

function SideMenu() {
  const location = useLocation();

  return (
    <div className="SideMenu">
      <div className="SideMenu__logo">
        <Logo />
      </div>
      <ul className="side-menu__list">
        <Link to="/#" target="_blank" className="side-menu__item">
          <img
            src={location !== '/perconalArea' ? UserCircle : UserCircleActive}
            //  src={UserCircle}
            alt=""
            className="side-menu__logo"
          />
          <p className="side-menu__text">Личный кабинет</p>
        </Link>
        <Link to="/#" target="_blank" className="side-menu__item">
          <img src={kanbanboard} alt="" className="side-menu__logo" />
          <p className="side-menu__text">Канбан доска</p>
        </Link>
        <Link to="/#" target="_blank" className="side-menu__item">
          <img src={assessment} alt="" className="side-menu__logo" />
          <p className="side-menu__text">Оценить коллегу</p>
        </Link>
        <Link to="/#" target="_blank" className="side-menu__item">
          <img src={analytics} alt="" className="side-menu__logo" />
          <p className="side-menu__text"> Аналитика</p>
        </Link>
      </ul>
      <button className="side-menu__button-exit">Выйти</button>
    </div>
  );
}

export default SideMenu;
