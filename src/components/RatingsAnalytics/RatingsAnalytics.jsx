import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SetStars from '../SetStars/SetStars.js';
import Switch from '../Switch/Switch.jsx';
import Select from '../Select/Select.jsx';
import {
  getAllUsers,
  getListMonthsCommand,
  getListMonthsPersonal,
  getListMonthUser,
  getListYears
} from '../../utils/mainApi.js';
import styles from './RatingsAnalytics.module.scss';

function RatingsAnalytics({ setLoading, handleError }) {
  const currentYear = new Date().getFullYear();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [isPrivate, setIsPrivate] = useState(false);
  const [users, setUsers] = useState([]);
  const [listMonth, setListMonth] = useState([]);
  const [listYears, setListYears] = useState([]);
  const [selectedListYear, setSelectedListYear] = useState(currentYear);
  const [selectedUser, setSelectedUser] = useState(0);

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

  function getNameMonth(number) {
    const date = new Date(String(number));
    let monthName = date.toLocaleString('default', { month: 'long' });
    monthName = monthName[0].toLocaleUpperCase() + monthName.slice(1);

    return `${monthName} ${selectedListYear}`;
  }

  return (
    <>
      <div className={styles.filter_block}>
        <Switch
          labelLeft="Командная"
          labelRight="Индивидуальная"
          isChecked={isPrivate}
          setIsChecked={setIsPrivate}
        />
        {isPrivate && isAdmin && (
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
      </div>
      <div className={styles.info_block}>
        {listMonth[0] ? (
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
      </div>
    </>
  );
}

export default RatingsAnalytics;
