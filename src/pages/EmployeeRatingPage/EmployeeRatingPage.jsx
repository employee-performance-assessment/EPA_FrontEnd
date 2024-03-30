import { Link } from 'react-router-dom';
import styles from './EmployeeRatingPage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import EmployeeViewCriteria from '../../components/EmployeeViewCriteria/EmployeeViewCriteria.jsx';
import criteria from './criteria.json';
import SetStars from '../../components/SetStars/SetStars.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function EmployeeRatingPage() {
  const { viewCards } = ENDPOINT_ROUTES;

  return (
    <section className={styles.employeeRatingPage__wrapper}>
      <SideMenu />
      <div className={styles.employeeRatingPage__container}>
        <div className={styles.employeeRatingPage__header}>
          <div className={styles.employeeRatingPage__row}>
            <Link to={viewCards} className={styles.employeeRatingPage__link}>
              <div className={styles.employeeRatingPage__icon}></div>
              <p className={styles.employeeRatingPage__caption}>Назад </p>
            </Link>
            <h2 className={styles.employeeRatingPage__title}>
              Оценки за Февраль 2024
            </h2>
          </div>
          <div className={styles.employeeRatingPage__score}>
            {/* Захардкодил рейтинг в хедере, будет приходить с бэка */}
            <SetStars
              rating={'4'}
              starOut={styles.employeeRatingPage__star_out}
              starIn={styles.employeeRatingPage__star_in}
            />
          </div>
        </div>
        <div className={styles.employeeRatingPage__block}>
          <div className={styles.employeeRatingPage__criteria}>
            <p></p>
            <h3>От руководителя</h3>
            <h3>От коллег</h3>
          </div>
          <ul className={styles.employeeRatingPage__list}>
            {/* Текст карточек пока приходит из json */}
            {criteria.map((card) => (
              <EmployeeViewCriteria key={card.id} text={card.text} rating={card.rating} />
            ))}
          </ul>

          <h3 className={styles.employeeRatingPage__recoTitle}>
            Рекомендации для сотрудника
          </h3>
          <div className={styles.employeeRatingPage__recoText}>
            <p>
              Здравствуй, Иван. Провел оценку твоей работы за неделю, ты молодец
              все задачи сделаны, но дедлайн часто не соблюдался. <br /> 1. Не
              стесняйся просить обратную связь у коллег. Это поможет обнаружить
              области, в которых ты можешь улучшиться. <br /> 2. Работай над
              коммуникацией: Хорошая коммуникация с коллегами и клиентами играет
              ключевую роль в успешном проекте. Убедись, что четко понимаешь
              требования клиента и можешь эффективно общаться с другими
              участниками команды. <br /> 3. Изучай тенденции в дизайне: Будьте
              в курсе последних тенденций и инноваций в мире дизайна. Это
              поможет нам создавать современные и актуальные дизайн-решения.
              <br /> Удачи в работе!!!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeRatingPage;
