import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const history = useNavigate();

  return (
    <section className="not-found">
<<<<<<< HEAD
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
=======
      <h2 className="not-found__title">Ведутся технические работы</h2>
      <p className="not-found__subtitle">
        Ваш личный кабинет находится на техническом обслуживании и некоторые
        функции недоступны. Приносим свои извинения.
      </p>
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
      <Link className="not-found__link" onClick={() => history(-1)}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
