import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Switch from '../../components/Switch/Switch.jsx';
import Select from '../../components/Select/Select.jsx';
import SetStars from '../../components/SetStars/SetStars.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';
import {
  getAllUsers,
  getListMonthsCommand,
  getListMonthsPersonal,
  getListMonthUser,
  getListYears
} from '../../utils/mainApi.js';
import styles from './AnalyticsPage.module.scss';

function AnalyticsPage() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const currentYear = new Date().getFullYear();
  const [isPrivate, setIsPrivate] = useState(false);
  const [isEstimate, setIsEstimate] = useState(false);
  const [users, setUsers] = useState([]);
  const [listYears, setListYears] = useState([]);
  const [listMonth, setListMonth] = useState([]);
  const [selectedListYear, setSelectedListYear] = useState(currentYear);
  const [selectedUser, setSelectedUser] = useState(0);
  const { isLoading, setLoading } = useLoading();
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();

  useEffect(() => {
    setLoading(true);

    getListMonthsCommand(selectedListYear)
      .then((res) => {
        setListMonth(res);
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));

    getListYears()
      .then((res) => {
        setListYears(res.reverse());
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);

    if (isAdmin) {
      getAllUsers()
        .then((res) => {
          setUsers(res);
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!isPrivate) {
      setLoading(true);

      getListMonthsCommand(selectedListYear)
        .then((res) => {
          setListMonth(res);
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }

    if (isPrivate) {
      if (!isAdmin) {
        setLoading(true);

        getListMonthsPersonal(selectedListYear)
          .then((res) => {
            setListMonth(res);
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      }
    }
  }, [isPrivate]);

  function getNameMonth(number) {
    const date = new Date(String(number));
    let monthName = date.toLocaleString('default', { month: 'long' });
    monthName = monthName[0].toLocaleUpperCase() + monthName.slice(1);

    return `${monthName} ${selectedListYear}`;
  }

  const handleSubmitYear = (evt) => {
    const selectedYear = evt.target.value;
    setSelectedListYear(selectedYear);

    if (isPrivate) {
      setLoading(true);

      if (isAdmin) {
        getListMonthUser(selectedUser, selectedYear)
          .then((res) => {
            setListMonth(res);
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      } else {
        getListMonthsPersonal(selectedYear)
          .then((res) => {
            setListMonth(res);
          })
          .catch((err) => handleError(err))
          .finally(() => setLoading(false));
      }
    } else {
      getListMonthsCommand(selectedYear)
        .then((res) => {
          setListMonth(res);
        })
        .catch((err) => handleError(err))
        .finally(() => setLoading(false));
    }
  };

  const handleSubmitUser = (evt) => {
    setLoading(true);
    const user = evt.target.value;
    setSelectedUser(user);

    getListMonthUser(user, selectedListYear)
      .then((res) => {
        setListMonth(res);
      })
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.page}>
      {isLoading && <Loader />}
      {isPopupOpen && <InfoPopup text={popupText} handleClosePopup={closePopup} />}
      <div
        style={isEstimate ? { background: 'white' } : null}
        className={styles.container}
      >
        <header className={styles.header}>
          <div className={styles.analytic}>
            <span>Аналитика</span>
          </div>
          <Switch
            shadow="none"
            labelLeft="Командная"
            labelRight="Индивидуальная"
            isChecked={isPrivate}
            setIsChecked={setIsPrivate}
          />
        </header>
        <div className={styles.filter_block}>
          <Switch
            labelLeft="Оценки"
            labelRight="Дедлайны"
            isChecked={isEstimate}
            setIsChecked={setIsEstimate}
          />
          {isPrivate && !isEstimate && isAdmin && (
            <Select
              typeSelect="users"
              list={users}
              buttonText="Исполнитель"
              query={handleSubmitUser}
              selectStyle={styles.user_select}
              buttonStyle={styles.user_button}
              listStyle={styles.users_ul}
              optionStyle={styles.users_list}
            />
          )}
          {!isEstimate && (
            <Select
              typeSelect="year"
              list={listYears}
              buttonText={selectedListYear}
              query={handleSubmitYear}
              selectStyle={styles.select_year}
              buttonStyle={styles.year_button}
              listStyle={styles.year_ul}
              optionStyle={styles.year_list}
            />
          )}
          {isEstimate && (
            <div className={styles.deadline_filter}>
              <Select
                typeSelect="month"
                list={['Январь', 'Февраль', 'Март', 'Апрель']}
                buttonText="Февраль"
                selectStyle={styles.month_select}
                buttonStyle={styles.month_button}
                listStyle={styles.month_ul}
                optionStyle={styles.month_list}
              />
              <Select
                typeSelect="year"
                list={['2023', '2024', '2025', '2026']}
                buttonText="2024"
                selectStyle={styles.deadline_select}
                buttonStyle={styles.deadline_button}
                listStyle={styles.deadline_ul}
                optionStyle={styles.deadline_list}
                query={handleSubmitYear}
              />
              <button className={styles.deadline_submit}>Показать</button>
            </div>
          )}
        </div>
        <article
          style={isEstimate ?
            { boxShadow: '0px 4px 20px 0px rgba(166, 166, 166, 0.4)' } :
            null
          }
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
      </div>
    </section>
  );
}

export default AnalyticsPage;
