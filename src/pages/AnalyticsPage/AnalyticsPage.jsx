import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import Select from '../../components/Select/Select.jsx';
import SetStars from '../../components/SetStars/SetStars.js';

import { getAllUsers } from '../../utils/mainApi.js';
import data from './data.json';

import flyMan from '../../images/fly-man.svg';

import styles from './AnalyticsPage.module.scss';

function AnalyticsPage() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isEstimate, setIsEstimate] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('token'));
    getAllUsers(token).then((data) => setUsers(data));
  }, []);

  const handleSubmitYear = () => {
    console.log('andleSubmitYear');
  };

  const handleSubmitUser = () => {
    console.log('handleSubmitUser');
  };

  return isLoggedIn ? (
    <section className={styles.page}>
      <SideMenu />
      <div style={isEstimate ? { background: 'white' } : null} className={styles.container}>
        <header className={styles.header}>
          <div className={styles.analytic}>
            <span>Аналитика</span>
          </div>
          <Checkbox
            shadow="none"
            labelLeft="Командная"
            labelRight="Индивидуальная"
            isChecked={isPrivate}
            setIsChecked={setIsPrivate}
          />
        </header>
        <div className={styles.filter_block}>
          <Checkbox
            labelLeft="Оценки"
            labelRight="Дедлайны"
            isChecked={isEstimate}
            setIsChecked={setIsEstimate}
          />
          {(isPrivate && !isEstimate) && <Select
            typeSelect="users"
            list={users}
            buttonText="Исполнитель"
            query={handleSubmitUser}
            selectStyle={styles.user_select}
            buttonStyle={styles.user_button}
            listStyle={styles.users_ul}
            optionStyle={styles.users_list}
          />}
          {!isEstimate && <Select
            typeSelect="list"
            list={['2023', '2024', '2025', '2026']}
            buttonText="Год"
            query={handleSubmitYear}
            selectStyle={styles.select_year}
            buttonStyle={styles.year_button}
            listStyle={styles.year_ul}
            optionStyle={styles.year_list}
          />}
        </div>
        <article style={isEstimate ? { boxShadow: '0px 4px 20px 0px rgba(166, 166, 166, 0.4)' } : null} className={styles.info_block}>
          {(data && !isEstimate) ? data.map((item) => (
            <div className={styles.rating_block} key={item.id}>
              <div className={styles.date}>
                <span>
                  {item.month} {item.year}
                </span>
              </div>
              <SetStars
                rating={item.rating}
                starOut={styles.starOut}
                starIn={styles.starIn}
              />
            </div>
          )) : <div className={styles.img_block}>
            <img className={styles.flyMan} src={flyMan} alt="Список пуст" />
            <span>Данных для аналитики ещё нет.</span>
          </div>}
        </article>
      </div>
    </section>
  ) : (
    ''
  );
}

export default AnalyticsPage;
