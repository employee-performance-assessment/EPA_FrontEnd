import styles from './EmployeeViewCard.module.scss';

function EmployeeViewCard({
  type,
  title,
  deadline,
  terms,
  points,
  rating,
  month,
  date,
}) {
  // создаем звездочки рейтинга
  function setStars() {
    let widthStar = Number(rating) + 1;
    return [1, 2, 3, 4, 5].map((i) => {
      widthStar -= 1;
      return (
        <div className={styles.cardRating__star_out} key={i}>
          <div
            className={styles.cardRating__star_in}
            style={{ width: `${paintStar(widthStar)}%` }}
          />
        </div>
      );
    });
  }

  function paintStar(width) {
    if (width >= 1) {
      return 100;
    } else if (width < 1 && width > 0) {
      return (Math.asin(2 * width - 1) / Math.PI + 0.5) * 100;
    } else if (width === 0 || width < 0) {
      return 0;
    }
  }

  return type === 'tasks' ? (
    <div className={styles.employeeViewCard__container}>
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>{title}</h2>
        <p className={styles.employeeViewCard__deadline}>Дедлайн: {deadline}</p>
        <p className={styles.employeeViewCard__terms}>{terms}</p>
      </div>
      <div className={styles.employeeViewCard__rating}>{points} баллов</div>
      <button type="button" className={styles.employeeViewCard__button}>
        Подробнее
      </button>
    </div>
  ) : (
    <div className={styles.employeeViewCard__container}>
      <div className={styles.employeeViewCard__text}>
        <h2 className={styles.employeeViewCard__title}>Оценки за {month}</h2>
        <p className={styles.employeeViewCard__date}>
          Дата анкетирования: {date}
        </p>
      </div>
      <div className={styles.employeeViewCard__stars}>{setStars()}</div>
      <button type="button" className={styles.employeeViewCard__button}>
        Подробнее
      </button>
    </div>
  );
}

export default EmployeeViewCard;
