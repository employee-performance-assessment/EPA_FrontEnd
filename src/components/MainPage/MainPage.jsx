import React from 'react';
import './MainPage.scss';
import PersonalArea from '../PersonalArea/PersonalArea.jsx';
import AdminPanel from '../AdminPanel/AdminPanel.jsx';
// import TimerDeadline from '../TimerDeadline/TimerDeadline.jsx';

function MainPage() {
  const status = !true;
  /* заменить на статус пользователя */
  return (
    <>
      <main>{status ? <PersonalArea /> : <AdminPanel />}</main>
      {/* <Footer /> */}
    </>
  );
}

export default MainPage;
