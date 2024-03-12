import React from 'react';
import cards from './CardEmployee.json';
import styles from './CardEmployee.module.scss';
import Checkbox from '../Checkbox/Checkbox.jsx';
import CriterionInput from '../CriterionInput/CriterionInput.jsx';

function CardEmployee() {
  const defaultLabel = 'По умолчанию';
  const newLabel = 'Новые';

  return (
    <section className={styles.criteria__container}>
      <Checkbox label1={defaultLabel} label2={newLabel} />
      <ul className={styles.criteria__list}>
        {/* Текст карточек пока приходит из json */}
        {cards.map((card) => (
          <CriterionInput key={card.id} text={card.text} />
        ))}
      </ul>
    </section>
  );
}

export default CardEmployee;
