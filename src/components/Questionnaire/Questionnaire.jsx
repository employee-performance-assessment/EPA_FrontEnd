import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './Questionnaire.scss';
import icon from '../../images/Questionnaire_user.svg';
import InputStars from '../InputStars/InputStars.js';
import '../InputStars/InputStars.scss';
import { getAllCriterion, getCurrentUser } from '../../utils/mainApi.js';

export default function Questionnaire() {
  const [criteria, setCriteria] = useState([]);
  const [user, setUser] = useState();

  const params = useParams();
  const employeeId = params.id;

  const name = 'ssss';
  const job = 'cccc';

  useEffect(() => {
    getAllCriterion()
      .then((res) => {
        setCriteria(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser(employeeId)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUser]);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(e.target);
  // }
  function GoBack() {
    navigate('/estimate');
  }

  function handleChange() {
    // console.log(e.target.value);
    // console.log(e.target.name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const values = [];
    const input = '';

    // eslint-disable-next-line no-restricted-syntax
    // for (const input of inputs) {
    //   values.push(Number(input.value));
    // }
    console.log(values);
    console.log(input);
    console.log('user:', user);
    return values;
  }

  return (
    <div className="Questionnaire">
      <div className="Questionnaire__wrapper">
        <div className="Questionnaire__header">
          <button
            className="Questionnaire-header__back-button"
            onClick={() => GoBack()}
          >
            Назад к списку
          </button>
          {/* здесть прокинуть пропсом период оценки */}
          <span className="Questionnaire-header__data">
            Оценка работы за март
          </span>
          <img
            src={icon}
            alt="иконка с символическим изображением аватара пользователя"
            className="Questionnaire-header__icon"
          />
          <span className="Questionnaire-header__underscribe">{name}</span>
          <span className="Questionnaire-header__underscribe">&frasl;</span>
          <span className="Questionnaire-header__underscribe">{job}</span>
        </div>
        <div className="Questionnaire-titles">
          <span className="Questionnaire-titles__text">Критерии</span>
          <span>Оценка</span>
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="Questionnaire-container">
            {criteria.map((item) => (
              <>
                <p className="Questionnaire__criterion">{item.name}</p>
                <div className="Questionnaire__value">
                  <InputStars handleChange={handleChange} name={item.name} />
                </div>
              </>
            ))}
          </div>
          <span className="Questionaire__text">
            Рекомендации для сотрудника
          </span>
          <textarea
            type="text"
            className="Questionnaire__input-text"
            placeholder="Ваши комментарии"
          />
          <button className="Questionnaire__button">Отправить</button>
        </form>
      </div>
    </div>
  );
}
