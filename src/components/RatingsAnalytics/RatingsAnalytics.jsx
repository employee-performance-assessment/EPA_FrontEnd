import SetStars from '../SetStars/SetStars.js';
import styles from './RatingsAnalytics.module.scss';

function RatingsAnalytics({ selectedListYear, isEstimate, listMonth }) {

  function getNameMonth(number) {
    const date = new Date(String(number));
    let monthName = date.toLocaleString('default', { month: 'long' });
    monthName = monthName[0].toLocaleUpperCase() + monthName.slice(1);

    return `${monthName} ${selectedListYear}`;
  }

  return (
    <article
      className={styles.info_block}
    >
      {listMonth[0] && !isEstimate ? (
        listMonth.map((item) => (
          <div className={styles.rating_block} key={item.monthNumber}>
            <div className={styles.date}>
              <span>
                {getNameMonth(item.monthNumber)} {item.year}
              </span>
            </div>
            <SetStars
              rating={item.rating}
              starOut={styles.starOut}
              starIn={styles.starIn}
            />
          </div>
        ))
      ) : (
        <div className={styles.img_block}>
          <div className={styles.flyMan} />
          <span>Данных для аналитики ещё нет.</span>
        </div>
      )}
    </article>
  );
}

export default RatingsAnalytics;
