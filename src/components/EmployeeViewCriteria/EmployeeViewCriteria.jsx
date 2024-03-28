import setStars from '../../utils/setStars';
import styles from './EmployeeViewCriteria.module.scss';

function EmployeeViewCriteria({ text, rating }) {
  return (
    <div className={styles.employeeViewCriteria__card}>
      <p className={styles.employeeViewCriteria__text}>{text}</p>
      <div className={styles.employeeViewCriteria__starbox}>
        {setStars(
          rating,
          styles.employeeViewCriteria__star_out,
          styles.employeeViewCriteria__star_in
        )}
      </div>
      <div className={styles.employeeViewCriteria__starbox}>
        {setStars(
          rating,
          styles.employeeViewCriteria__star_out,
          styles.employeeViewCriteria__star_in
        )}
      </div>
    </div>
  );
}

export default EmployeeViewCriteria;
