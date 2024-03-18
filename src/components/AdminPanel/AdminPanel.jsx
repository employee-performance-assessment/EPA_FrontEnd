import './AdminPanel.scss';
import SideMenu from '../SideMenu/SideMenu.jsx';

function AdminPanel({ children }) {
  return (
    <div className="admin-panel__conainer">
      <div className="admin-panel__sidebar">
        <SideMenu />
      </div>
      <div className="admin-panel__main">{children}</div>
    </div>
  );
}
export default AdminPanel;
