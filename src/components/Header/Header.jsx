import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="logo-text">learn react</div>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link" to="#">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to="#">
              About
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to="#">
              Contact
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to="#">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
