import { useState } from 'react';
import { useSelector } from 'react-redux';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';

import flyMan from '../../images/fly-man.svg';
/* import ratingStar from '../../images/rating_star_full.svg';
import emptyStar from '../../images/rating_star_empty.svg'; */
import commandIcon from '../../images/command-icon.svg';

import styles from './AnalyticsPage.module.scss';

function AnalyticsPage() {
  const [value, setValue] = useState('');
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  return isLoggedIn ? (
    <section className={styles.page}>
      <SideMenu />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.analytic}>
            <span>Аналитика</span>
          </div>
          <Checkbox
            shadow="none"
            labelLeft="Командная"
            labelRight="Индивидуальная"
          />
        </header>
        <div className={styles.filter_block}>
          <Checkbox labelLeft="Оценки" labelRight="Дедлайны" />
          <input
            className={styles.calendar}
            value={value.split(' ').reverse().join('')}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            name="calendar"
            id="calendar"
            placeholder="Календарь&nbsp;"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
        </div>
        <article className={styles.info_empty}>
          <h3>Команда</h3>
          <div className={styles.img_block}>
            <img className={styles.flyMan} src={flyMan} alt="Список пуст" />
            <span>Данных для аналитики ещё нет.</span>
          </div>
          {/* <section className={styles.slider}>
      {estimation.map((data, personIndex) => {
        const { id, date, name, rating, text, userImage, kitchenImage } = data;
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
              <span className={styles.year}>{date}</span>
              <h4 className={styles.name}>{name}</h4>
              <div className={styles.rating}>{handleStarr(rating)}</div>
              <p className={styles.text}>{text}</p>
            </div>
            <div className={styles.image_block}>
              <img className={styles.img} src={userImage} alt="Фото пользователя" />
              <img className={styles.img} src={kitchenImage} alt="Фото кухни пользователя" />
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
    </section> */}

          <img
            className={styles.commandIcon}
            src={commandIcon}
            alt="Иконка команды"
          />
        </article>
      </div>
    </section>
  ) : (
    ''
  );
}

export default AnalyticsPage;
