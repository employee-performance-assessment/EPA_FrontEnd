/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CriterionInput from '../../components/CriterionInput/CriterionInput.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import { getAllCriterion, getDefaultCriterion } from '../../utils/mainApi.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import {
  labelSupervisor,
  labelAllTeam,
  labelDefaultCriteriaGrade,
  labelEditCriteriaGrade
} from '../../constants/constantLabelCheckbox.js';
import './AssessmentCriteria.scss';

function AssessmentCriteria() {
  const [criteria, setCriteria] = useState([]);
  const [isCheckedСounting, setIsCheckedСounting] = useState(false);
  const [isCheckedEditing, setIsCheckedEditing] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { personalArea } = ENDPOINT_ROUTES;
  const navigate = useNavigate();

  useEffect(() => {
    if (isCheckedEditing) {
      getAllCriterion()
        .then((res) => {
          setCriteria(res);
        })
        .catch((err) => alert(err));
    } else {
      getDefaultCriterion()
        .then((res) => {
          setCriteria(res);
        })
        .catch((err) => alert(err));
    }
  }, [isCheckedEditing]);

  function handleDelete(criterion) {
    setCriteria(criteria.filter((item) => item.id !== criterion.id));
  }

  function addNewCriteria(evt) {
    evt.preventDefault();
    const newCriteria = { name: '' };
    setCriteria([...criteria, newCriteria]);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsOpenPopup(!isOpenPopup);
  }

  function handleNavigate() {
    setIsOpenPopup(!isOpenPopup);
    navigate(personalArea);
  }

  return (
    <section className="assessment-criteria">
      <div className="assessment-criteria__header">
        <Link to="/admin-person-area" className="assessment-criteria__link">
          <div className="assessment-criteria__link-arroy" />
          Вернуться
        </Link>
        <div className="assessment-criteria__checkbox-container">
          <h2 className="assessment-criteria__header-title">Для подсчета рейтинга учитывать оценки:</h2>
          <div className="assessment-criteria__checkbox">
            <Switch
              labelLeft={labelSupervisor}
              labelRight={labelAllTeam}
              isChecked={isCheckedСounting}
              setIsChecked={setIsCheckedСounting}
              shadow="none"
            />
          </div>
        </div>
      </div>
      <div className="assessment-criteria__container-criterion">
        <h2 className="assessment-criteria__title">Критерии для оценки сотрудников</h2>
        <Switch
          labelLeft={labelDefaultCriteriaGrade}
          labelRight={labelEditCriteriaGrade}
          isChecked={isCheckedEditing}
          setIsChecked={setIsCheckedEditing}
        />
        <form className="assessment-criteria__form">
          {criteria.map((criterion) => (
            <CriterionInput
              key={criterion.id}
              criterion={criterion}
              name={criterion.name}
              editing={isCheckedEditing}
              handleDelete={handleDelete}
            />
          ))}
          {isCheckedEditing &&
            <button className="assessment-criteria__add-button" onClick={(evt) => addNewCriteria(evt)}>
              <span>+ </span>Добавить критерий
            </button>}
          <button className="assessment-criteria__submit" onClick={(evt) => handleSubmit(evt)}>Подтвердить</button>
        </form >
      </div>
      {
        isOpenPopup &&
        <div className="assessment-criteria__popup">
          <div className="assessment-criteria__popup-window">
            <h3 className="assessment-criteria__popup-title">{
              `${isCheckedEditing ?
                'Ваши изменения внесены' :
                'Выбрана анкета по умолчанию'
              }`}</h3>
            <p className="assessment-criteria__popup-subtitle">{
              `${isCheckedEditing ?
                'Анкетирование будет проводиться по заданным Вами критериям.' :
                'Анкетирование будет проводиться по критериям нашего сервиса “Well Done”'
              }`}</p>
            <button className="assessment-criteria__popup-button" onClick={handleNavigate}>
              Вернуться в личный кабинет
            </button>
          </div>
        </div>
      }
    </section >
  );
}

export default AssessmentCriteria;
