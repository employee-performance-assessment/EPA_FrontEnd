import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MenuAdmin from './MenuAdmin/MenuAdmin.jsx';
import MenuEmployee from './MenuEmployee/MenuEmployee.jsx';
import exitIcon from '../../images/exit_button.svg';
import logo from '../../images/logo.svg';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';
import { setAdminData } from '../../store/slices/adminDataSlices.js';
import { setToken } from '../../store/slices/tokenSlices.js';
import './SideMenu.scss';

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
      <img className="side-menu__logo" src={logo} alt="Логотип" />
      {location.pathname === '/admin-person-area' ? (
        <MenuAdmin />
      ) : (
        <MenuEmployee />
      )}
      <button onClick={handleLogout} className="sideMenu__button">
        <img
          src={exitIcon}
          alt="иконка кнопки выхода из приложения"
          className="sideMenu__button_icon"
        />
        <p className="sideMenu__button_text">Выйти</p>
      </button>
    </div>
  );
}

export default SideMenu;
