import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';
import { setAdminData } from '../../store/slices/adminDataSlices.js';
import { setToken } from '../../store/slices/tokenSlices.js';

import Logo from '../Logo/Logo.jsx';
import './SideMenu.scss';
// import logo from '../../images/logo.svg';
import UserCircle from '../../images/UserCircle.svg';
import UserCircleActive from '../../images/UserCircle_active.svg';
import kanbanBoard from '../../images/KanbanBoard.svg';
import assessment from '../../images/assessment.svg';
import analytics from '../../images/analytics.svg';

function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setToken(''));
    dispatch(setIsLoggedIn(false));
    dispatch(setAdminData({}));
    navigate('/');
  };

  return (
    <div className="side-menu">
      <div className="side-menu__logo">
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
          <img src={kanbanBoard} alt="" className="side-menu__logo" />
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
      <button onClick={handleLogout} className="side-menu__button-exit">
        Выйти
      </button>
    </div>
  );
}

export default SideMenu;
