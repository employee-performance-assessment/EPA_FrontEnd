import { useState, useEffect } from 'react';
import setStars from '../../utils/setStars';

import styles from './RatingCard.module.scss';

function RatingCard({ data }) {
  // const [estimation, setEstimation] = useState(data.teamRating);
  const estimation = data.teamRating;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lastIndex = estimation.length - 1;
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex);
    }
    if (currentIndex > lastIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, estimation]);

  useEffect(() => {
    const slider = setInterval(
      () => setCurrentIndex((prevState) => prevState + 1),
      50000
    );
    return () => {
      clearInterval(slider);
    };
  }, [currentIndex]);

  return (
    <section className={styles.slider}>
      {estimation.map((data, personIndex) => {
        const { id, year, month, rating } = data;
        console.log(data);
        let state = styles.nextSlide;
        if (personIndex === currentIndex) {
          state = styles.activeSlide;
        }
        if (
          personIndex === currentIndex - 1 ||
          (currentIndex === 0 && personIndex === estimation.length - 1)
        ) {
          state = styles.lastSlide;
        }
        return (
          <article className={state} key={id}>
            <div className={styles.info_block}>
              <span className={styles.year}>{year}</span>
              <div className={styles.rating}>
                <div className={styles.month_block}>
                  <span>{month}</span>
                  {setStars(rating, styles.star_out, styles.star_in)}
                </div>
              </div>
            </div>
          </article>
        );
      })}
      <button
        onClick={() => setCurrentIndex((prevState) => prevState - 1)}
        className={styles.arrow}
        type="button"
      ></button>
      <button
        onClick={() => setCurrentIndex((prevState) => prevState + 1)}
        className={styles.arrow}
        type="button"
      ></button>
    </section>
  );
}

export default RatingCard;
