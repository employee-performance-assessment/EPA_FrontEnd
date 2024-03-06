import React from 'react';
import './MainPage.scss';
import PersonalArea from '../PersonalArea/PersonalArea.jsx';
import AdminPanel from '../AdminPanel/AdminPanel.jsx';

function MainPage() {
<<<<<<< HEAD
  const status = true;
  /* заменить на статус пользователя */
  return (
    <>
      <main>{status ? <PersonalArea /> : <AdminPanel />}</main>
=======
  const status = !true;
  /* заменить на статус пользователя */
  return (
    <>
      <main>

        {status ? (
          <PersonalArea />
        ) : (
          <AdminPanel />
        )}
      </main>
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
      {/* <Footer /> */}
    </>
  );
}

export default MainPage;
