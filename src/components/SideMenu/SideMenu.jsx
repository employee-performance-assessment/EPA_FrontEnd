import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuAdmin from './MenuAdmin/MenuAdmin.jsx';
import MenuEmployee from './MenuEmployee/MenuEmployee.jsx';
import exitIcon from '../../images/exit_button.svg';
import logo from '../../images/logo.svg';
import { setIsLoggedIn } from '../../store/slices/isLoggedInSlice.js';
import { setAdminData } from '../../store/slices/adminDataSlices.js';
import { setToken } from '../../store/slices/tokenSlices.js';
import './SideMenu.scss';

function SideMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminData.adminData);

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
      {adminData.role === 'ROLE_ADMIN' ? <MenuAdmin /> : <MenuEmployee />}
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
