import './MainPage.scss';
import PersonalArea from '../PersonalArea/PersonalArea.jsx';
import AdminPanel from '../AdminPanel/AdminPanel.jsx';
// import TimerDeadline from '../TimerDeadline/TimerDeadline.jsx';
import Register from '../Register/Register.jsx';

function MainPage() {
  const status = !true;
  /* заменить на статус пользователя */
  return (
    <>
      <main>{status ? <PersonalArea /> : <><AdminPanel /> <Register /></>}</main>
      {/* <Footer /> */}
    </>
  );
}

export default MainPage;
