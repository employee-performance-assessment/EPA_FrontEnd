import './AdminPanel.scss';
import Card from '../Card/Card.jsx';
import SideMenu from '../SideMenu/SideMenu.jsx';

function AdminPanel() {
  return (
    <div className="AdminPanel__conainer">
      <div className="AdminPanel__sidebar">
        <SideMenu />
      </div>
      <div className="AdminPanel__main">
        <ul className="AdminPanel__list">
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default AdminPanel;
