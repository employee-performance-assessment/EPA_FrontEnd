import { useState /* , useEffect */ } from 'react';
import { useSelector } from 'react-redux';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import RatingCard from '../../components/RatingCard/RatingCard.jsx';

// import flyMan from '../../images/fly-man.svg';

import commandIcon from '../../images/command-icon.svg';

import styles from './AnalyticsPage.module.scss';

function AnalyticsPage() {
  const data =
    {
      teamRating: [
        {
          year: 2023,
          month: 1,
          rating: 4,
          team: 'user',
          id: 1,
        },
        {
          year: 2023,
          month: 2,
          rating: 5,
          team: 'user',
          id: 2,
        },
        {
          year: 2023,
          month: 3,
          rating: 2,
          team: 'user',
          id: 3,
        },
        {
          year: 2023,
          month: 4,
          rating: 3,
          team: 'user',
          id: 4,
        },
      ],
    };

  const [value, setValue] = useState('');
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  // console.log(value.split('-').reverse().join('-'));

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
        {/* <article className={styles.info_empty}>
          <h3>Команда</h3>
          <div className={styles.img_block}>
            <img className={styles.flyMan} src={flyMan} alt="Список пуст" />
            <span>Данных для аналитики ещё нет.</span>
          </div>
          <img
            className={styles.commandIcon}
            src={commandIcon}
            alt="Иконка команды"
          />
        </article> */}
        <article className={styles.info_data}>
          <div className={styles.command_block}>
            <h3>Команда</h3>
            <img
            className={styles.commandIcon}
            src={commandIcon}
            alt="Иконка команды"
          />
          </div>
          <RatingCard data={data} />
        </article>
      </div>
    </section>
  ) : (
    ''
  );
}

export default AnalyticsPage;
