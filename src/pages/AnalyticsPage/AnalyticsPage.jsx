import { useState } from 'react';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';

import flyMan from '../../images/fly-man.svg';
import commandIcon from '../../images/command-icon.svg';

import styles from './AnalyticsPage.module.scss';

function AnalyticsPage({ isLoggedIn }) {
  const [value, setValue] = useState('');

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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="date"
            name="calendar"
            id="calendar"
            placeholder="Календарь"
          />
        </div>
        <article className={styles.info_empty}>
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
        </article>
      </div>
    </section>
  ) : (
    ''
  );
}

export default AnalyticsPage;
