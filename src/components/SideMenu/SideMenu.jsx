import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo.jsx';
import './SideMenu.scss';
import MenuAdmin from './MenuAdmin/MenuAdmin.jsx';
import MenuEmployee from './MenuEmployee/MenuEmployee.jsx';
import exitIcon from '../../images/exit_button.svg';

function SideMenu() {
  const location = useLocation();

  return (
    <div className="side-menu">
      <div className="side-menu__logo">
        <Logo />
      </div>
      {location.pathname === '/admin-person-area' ? (
        <MenuAdmin />
      ) : (
        <MenuEmployee />
      )}
      <button className="sideMenu__button">
        <img src={exitIcon} alt="иконка кнопки выхода из приложения" className="sideMenu__button_icon" />
        <p className="sideMenu__button_text">Выйти</p>
      </button>
    </div>
  );
}

export default SideMenu;
