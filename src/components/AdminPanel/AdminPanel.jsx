import './AdminPanel.scss';
import Card from '../Card/Card.jsx';

function AdminPanel() {
  return (
    <div className="AdminPanel__conainer">
      <div className="AdminPanel__sidebar">
        <h1>Admin panel</h1>

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
      <div className="AdminPanel__main"></div>
    </div>
  );
}
export default AdminPanel;
