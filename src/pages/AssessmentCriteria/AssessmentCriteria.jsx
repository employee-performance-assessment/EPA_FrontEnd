import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import CriterionInput from '../../components/CriterionInput/CriterionInput.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import { VALIDATION_MESSAGES } from '../../utils/validationConstants.js';
import {
  getQuestionnaireLast,
  updateQuestionnaireLast,
  getDefaultCriterion,
  resetToDefaultQuestionnaire
} from '../../utils/mainApi.js';
import {
  labelDefaultCriteriaGrade,
  labelEditCriteriaGrade
} from '../../constants/constantLabelCheckbox.js';
import './AssessmentCriteria.scss';

function AssessmentCriteria() {
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const [criteria, setCriteria] = useState([]);
  const [isCheckedEditing, setIsCheckedEditing] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const { personalArea } = ENDPOINT_ROUTES;
  const { values, handleChange, errors, isValid, setIsValid } = useFormValidation();
  const navigate = useNavigate();
  const dataForServer = { criterias: [] };

  useEffect(() => {
    if (isCheckedEditing) {
      getQuestionnaireLast()
        .then((res) => {
          setCriteria(res.criterias);
          insertCriteriaNames(res.criterias);
        })
        .catch((err) => handleError(err));
    } else {
      getDefaultCriterion()
        .then((res) => {
          setCriteria(res);
          insertCriteriaNames(res);
        })
        .catch((err) => handleError(err));
    }
  }, [isCheckedEditing]);

  useEffect(() => {
    if (criteria[0]) {
        criteria[0].name ? setDisabledButton(false) : setDisabledButton(true);
      if (values[1]) {
        values[1] ? setDisabledButton(false) : setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  }, [criteria, values])

  function insertCriteriaNames(arrayCriteria) {
    if (Object.keys(values)[0]) {
      Object.keys(values).forEach((key) => {
        delete values[key];
      })
    }

    arrayCriteria.forEach((criterion) => {
      const inputId = String(criterion.id);
      if (!values[inputId]) {
        values[inputId] = criterion.name;
      }
    })
  }

  function handleDelete(criterion, e) {
    delete values[criterion.id];
    setCriteria(criteria.filter((item) => item.id !== criterion.id));
    setIsValid(e.target.validity.valid);
  }

  function calculateId() {
    if (criteria[0]) {
      return criteria[criteria.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  function addNewCriteria(evt) {
    evt.preventDefault();
    const newCriteria = { id: calculateId(), name: '' };
    setCriteria([...criteria, newCriteria]);
  }

  function createDataForServer() {
    if (Object.values(values)[0]) {
      Object.values(values).forEach((item) => {
        const itemObject = { name: '' };
        itemObject.name = item.trim();
        dataForServer.criterias.push(itemObject);
      })
    }
    return dataForServer;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isCheckedEditing) {
      updateQuestionnaireLast(createDataForServer())
        .then(() => {
          setIsOpenPopup(!isOpenPopup);
          dataForServer.criterias = [];
        })
        .catch((err) => handleError(err));
    } else {
      resetToDefaultQuestionnaire()
        .then(() => {
          setIsOpenPopup(!isOpenPopup);
        })
        .catch((err) => handleError(err));
    }
  }

  function handleNavigate() {
    setIsOpenPopup(!isOpenPopup);
    navigate(personalArea);
  }

  return (
    <section className="assessment-criteria">
      {isPopupOpen && <InfoPopup text={popupText} handleClosePopup={closePopup} />}
      <div className="assessment-criteria__header">
        <Link to={personalArea} className="assessment-criteria__link">
          <div className="assessment-criteria__link-arroy" />
          Вернуться
        </Link>
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
            <div key={criterion.id}>
              <CriterionInput
                criterion={criterion}
                editing={isCheckedEditing}
                handleDelete={handleDelete}
                values={values[String(criterion.id)]}
                handleChange={handleChange}
                id={criterion.id}
              />
              <span className="assessment-criteria__input-error">
                {errors[criterion.id] && VALIDATION_MESSAGES.invalidCriterion}
              </span>
            </div>
          ))}
          {isCheckedEditing &&
            <button className="assessment-criteria__add-button" onClick={(evt) => addNewCriteria(evt)}>
              <span>+ </span>Добавить критерий
            </button>}
          <button
            className="assessment-criteria__submit"
            onClick={(evt) => handleSubmit(evt)}
            disabled={!isValid || disabledButton}
          >
            Подтвердить
          </button>
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
