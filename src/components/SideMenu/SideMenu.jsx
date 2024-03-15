import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.scss';
import logo from '../../images/logo.svg';
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
        <img src={logo} alt="логотип бокового меню" />
      </div>
      <ul className="SideMenu__list">
        <Link to="/#" target="_blank" className="SideMenu__item">
          <img
            src={location !== '/perconalArea' ? UserCircle : UserCircleActive}
            //  src={UserCircle}
            alt=""
            className="SideMenu__logo"
          />
          <p className="SideMenu__text">Личный кабинет</p>
        </Link>
        <Link to="/#" target="_blank" className="SideMenu__item">
          <img src={kanbanboard} alt="" className="SideMenu__logo" />
          <p className="SideMenu__text">Канбан доска</p>
        </Link>
        <Link to="/#" target="_blank" className="SideMenu__item">
          <img src={assessment} alt="" className="SideMenu__logo" />
          <p className="SideMenu__text">Оценить коллегу</p>
        </Link>
        <Link to="/#" target="_blank" className="SideMenu__item">
          <img src={analytics} alt="" className="SideMenu__logo" />
          <p className="SideMenu__text"> Аналитика</p>
        </Link>
      </ul>
      <button className="SideMenu__buttonExit">Выйти</button>
    </div>
  );
}

export default SideMenu;
