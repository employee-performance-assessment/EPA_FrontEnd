import { Link } from 'react-router-dom';
import styles from './EmployeeRatingPage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';

function EmployeeRatingPage() {
  return (
    <section className={styles.employeeRatingPage__wrapper}>
      <SideMenu />
      <div className={styles.employeeRatingPage__container}>
        <div className={styles.employeeRatingPage__header}>
          {/* Временный роут-заглушка */}
          <Link to={'#'} className={styles.employeeRatingPage__link}>
            <div className={styles.employeeRatingPage__icon}></div>
            <p className={styles.employeeRatingPage__caption}></p>
          </Link>
          <h3 className={styles.employeeRatingPage__title}></h3>
          <div className={styles.employeeRatingPage__score}></div>
        </div>
        <div className={styles.employeeRatingPage__block}>
          <div className={styles.employeeRatingPage__criteria}></div>
          <h3 className={styles.employeeRatingPage__recoTitle}>
            Рекомендации для сотрудника
          </h3>
          <div className={styles.employeeRatingPage__recoText}></div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeRatingPage;
