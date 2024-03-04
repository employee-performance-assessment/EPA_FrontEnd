import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const history = useNavigate();

  return (
    <section className="not-found">
      <h2 className="not-found__title">Ведутся технические работы</h2>
      <p className="not-found__subtitle">
        Ваш личный кабинет находится на техническом обслуживании и некоторые
        функции недоступны. Приносим свои извинения.
      </p>
      <Link className="not-found__link" onClick={() => history(-1)}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
