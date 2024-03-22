import styles from './AnalyticsPage.module.scss';

function AnalyticsPage({ isLoggedIn }) {
  return isLoggedIn ? (
    <section className={styles.container}>
      <h4>Hello world!!</h4>
    </section>
  ) : (
    ''
  );
}

export default AnalyticsPage;
