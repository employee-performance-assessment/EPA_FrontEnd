import { useSelector } from 'react-redux';

import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import Select from '../../components/Select/Select.jsx';
import setStars from '../../utils/setStars.js';

// import flyMan from '../../images/fly-man.svg';

import styles from './AnalyticsPage.module.scss';

function AnalyticsPage() {
  const data = [
    {
      year: 2024,
      month: 'Январь',
      rating: 5,
      id: 1,
    },
    {
      year: 2024,
      month: 'Февраль',
      rating: 4,
      id: 2,
    },
    {
      year: 2024,
      month: 'Март',
      rating: 3,
      id: 3,
    },
  ];
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  const handleSubmitYear = () => {
    console.log('query');
  };

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
          <Select buttonText="Год" query={handleSubmitYear} typeSelect="list" />
        </div>
        <article className={styles.info_empty}>
          {/* <div className={styles.img_block}>
            <img className={styles.flyMan} src={flyMan} alt="Список пуст" />
            <span>Данных для аналитики ещё нет.</span>
          </div> */}
          {data.map((item) => (
            <div className={styles.rating_block} key={item.id}>
              <div className={styles.date}>
                <span>
                  {item.month} {item.year}
                </span>
              </div>
              {setStars(item.rating, styles.starOut, styles.starIn)}
            </div>
          ))}
        </article>
      </div>
    </section>
  ) : (
    ''
  );
}

export default AnalyticsPage;
