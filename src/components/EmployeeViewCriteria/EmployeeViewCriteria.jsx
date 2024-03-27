import styles from './EmployeeViewCriteria.module.scss';

function EmployeeViewCriteria({ text }) {
  return (
    <div className={styles.employeeViewCriteria__card}>
      <p className={styles.employeeViewCriteria__text}>{text}</p>
      <div className={styles.employeeViewCriteria__starbox}></div>
      <div className={styles.employeeViewCriteria__starbox}></div>
    </div>
  );
}

export default EmployeeViewCriteria;
