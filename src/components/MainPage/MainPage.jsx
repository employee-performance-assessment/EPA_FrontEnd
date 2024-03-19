import './MainPage.scss';
import PersonalArea from '../../pages/PersonalArea/PersonalArea.jsx';
import AdminPanel from '../AdminPanel/AdminPanel.jsx';
import Register from '../../pages/Register/Register.jsx';

function MainPage() {
  const status = !true;
  /* заменить на статус пользователя */
  return (
    <>
      <main>{status ? <PersonalArea /> : <><AdminPanel /> <Register /></>}</main>
    </>
  );
}

export default MainPage;
