import { useState } from 'react';
import { Link } from 'react-router-dom';
import CriterionInput from '../CriterionInput/CriterionInput.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import {
  labelSupervisor,
  labelAllTeam,
  labelDefaultCriteriaGrade,
  labelEditCriteriaGrade
} from '../../constants/constantLabelCheckbox.js';
import initialCards from './CardEmployee.json';
import './AssessmentCriteria.scss';

function AssessmentCriteria() {
  const [cards, setCards] = useState(initialCards);
  const [isCheckedСounting, setIsCheckedСounting] = useState(false);
  const [isCheckedEditing, setIsCheckedEditing] = useState(false);

  function handleDelete(card) {
    setCards(cards.filter((item) => item.id !== card.id));
  }

  function addNewCriteria(evt) {
    evt.preventDefault();
    // создаю ид нового критерия
    const idCriteria = cards.length > 0 ? Number(cards[cards.length - 1].id) + 1 : 1;
    // создаю объект нового критерия
    const newCriteria = { id: idCriteria.toString(), text: '' };
    setCards([...cards, newCriteria]);
  }

  return (
    <div className="assessment-criteria">
      <div className="assessment-criteria__header">
        <Link to={'/admin-person-area'} className="assessment-criteria__link">
          <div className="assessment-criteria__link-arroy" />
          {'Вернуться'}
        </Link>
        <div className="assessment-criteria__checkbox-container">
          <h2 className="assessment-criteria__header-title">{'Для подсчета рейтинга учитывать оценки:'}</h2>
          <div className="assessment-criteria__checkbox">
            <Checkbox
              labelLeft={labelSupervisor}
              labelRight={labelAllTeam}
              isChecked={isCheckedСounting}
              setIsChecked={setIsCheckedСounting}
              shadow={'none'}
            />
          </div>
        </div>
      </div>
      <div className="assessment-criteria__container">
        <h2 className="assessment-criteria__title">{'Критерии для оценки сотрудников'}</h2>
        <Checkbox
          labelLeft={labelDefaultCriteriaGrade}
          labelRight={labelEditCriteriaGrade}
          isChecked={isCheckedEditing}
          setIsChecked={setIsCheckedEditing}
        />
        <form className="assessment-criteria__criterion-inputs">
          {cards.map((card) => (
            <CriterionInput
              key={card.id}
              card={card}
              text={card.text}
              editing={isCheckedEditing}
              handleDelete={handleDelete}
            />
          ))}
          {isCheckedEditing &&
            <button className="assessment-criteria__add-button" onClick={(evt) => addNewCriteria(evt)}>
              <span>+ </span>Добавить критерий
            </button>}
        </form >
      </div >
    </div >
  );
}

export default AssessmentCriteria;
