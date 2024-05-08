import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute';
import { getFromLocalStorage } from '../../utils/localStorageFunctions';
import InputStars from '../InputStars/InputStars';
import CloseIcon from '../../images/closeIcon.png';
import SearchIcon from '../../images/search-icon.png';
import styles from './EmployeeViewFilter.module.scss';

function EmployeeViewFilter({
  handleChange,
  showAllCards,
  version,
  getTasksByStatus,
  handleSearch,
  searchQuery,
  setSearchQuery,
  handleCloseSearchForm,
  getTasksByStatusAndKeyword,
  isSearching,
  setIsSearching
}) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  const navigate = useNavigate();
  const { id: employeeId, keyword: searchKeyword } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(
    searchKeyword ? '' : 'NEW'
  );
  const [isValid, setIsValid] = useState(false);
  const user = getFromLocalStorage('user');

  useEffect(() => {
    if (searchKeyword) {
      setSearchQuery(searchKeyword);
      setSelectedStatus('');
      handleSearch(searchKeyword);
      setIsValid(true);
    } else {
      setSelectedStatus('NEW');
      setIsValid(false);
    }
  }, [searchKeyword]);

  const handleStatusChange = (status) => {
    if (status) {
      setSearchQuery(searchKeyword);
      setSelectedStatus(status);
      searchKeyword
        ? getTasksByStatusAndKeyword(status, searchQuery)
        : getTasksByStatus(status);
    } else {
      setSelectedStatus('');
      handleSearch(searchQuery);
    }
  };

  const handleSearchChange = (evt) => {
    evt.preventDefault();
    if (searchQuery) {
      const route = user.isAdmin
        ? `${ENDPOINT_ROUTES.cardsEmployees}/${employeeId}/search/${searchQuery}`
        : `${ENDPOINT_ROUTES.userArea}/search/${searchQuery}`;
      navigate(route);
      handleSearch(searchQuery);
    } else {
      const route = user.isAdmin
        ? `${ENDPOINT_ROUTES.cardsEmployees}/${employeeId}`
        : `${ENDPOINT_ROUTES.userArea}`;
      navigate(route);
      setIsValid(false);
    }
    setSelectedStatus('');
  };

  const clearSearchForm = () => {
    handleCloseSearchForm();
    setSelectedStatus('NEW');
    setIsValid(false);
  };

  return viewMarks ? (
    <div className={styles.employeeViewFilter__container}>
      <div className={styles.employeeViewFilter__marks}>
        <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
        <div className={styles.employeeViewFilter__stars}>
          <InputStars
            name="stars"
            handleChange={handleChange}
            version={version}
          />
        </div>
        <button
          type="button"
          className={`${styles.employeeViewFilter__button_marks} ${styles.employeeViewFilter__button}`}
          onClick={showAllCards}
        >
          Все
        </button>
      </div>
      <div className={styles.employeeViewFilter__calendar}>
        <input
          type="text"
          className={`${styles.employeeViewFilter__input_marks} ${styles.employeeViewFilter__input}`}
          placeholder="Календарь"
        />
        <button type="button" className={styles.employeeViewFilter__icon} />
      </div>
    </div>
  ) : (
    <div className={styles.employeeViewFilter__container}>
      {searchKeyword ? (
        <>
          <input
            className={styles.employeeViewFilter__input_task}
            type="radio"
            name="filterTask"
            id="all"
            value="all"
            aria-label="Все"
            defaultChecked={searchKeyword}
          />
          <label
            className={`${styles.employeeViewFilter__label} ${selectedStatus === '' ? styles.selected : ''}`}
            htmlFor="all"
            onClick={() => handleStatusChange('')}
          >
            Все
          </label>
        </>
      ) : (
        <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
      )}
      <div
        className={styles.employeeViewFilter__inputs}
      >
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="new"
          value="new"
          aria-label="К выполнению"
          defaultChecked={selectedStatus === 'NEW'}
          onClick={() => handleStatusChange('NEW')}
        />
        <label
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'NEW' ? styles.selected : ''}`}
          htmlFor="new"
        >
          К выполнению
        </label>
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="inProgress"
          value="inProgress"
          aria-label="В работе"
          onClick={() => handleStatusChange('IN_PROGRESS')}
        />
        <label
          htmlFor="inProgress"
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'IN_PROGRESS' ? styles.selected : ''}`}
        >
          В работе
        </label>
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="review"
          value="review"
          aria-label="На ревью"
          onClick={() => handleStatusChange('REVIEW')}
        />
        <label
          htmlFor="review"
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'REVIEW' ? styles.selected : ''}`}
        >
          На ревью
        </label>
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="done"
          value="done"
          aria-label="Выполнено"
          onClick={() => handleStatusChange('DONE')}
        />
        <label
          htmlFor="done"
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'DONE' ? styles.selected : ''}`}
        >
          Выполнено
        </label>
      </div>
      <form className={styles.employeeViewFilter__searchForm} onSubmit={handleSearchChange}>
        <input
          type="text"
          name="search"
          className={styles.employeeViewFilter__input}
          placeholder="Поиск"
          value={searchQuery || ""}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
        />
        {!isSearching ? (
          <button
            className={styles.employeeViewFilter__searchForm_button}
            type="button"
            onClick={clearSearchForm}
            disabled={!isValid}
          >
            <span
              style={{ backgroundImage: `url(${CloseIcon})` }}
              className={styles.employeeViewFilter__searchForm_icon}
            />
          </button>
        ) : (
          <button
            className={styles.employeeViewFilter__searchForm_button}
            type="submit"
            disabled={!searchQuery}
          >
            <span
              style={{ backgroundImage: `url(${SearchIcon})` }}
              className={styles.employeeViewFilter__searchForm_icon}
            />
          </button>
        )}
      </form>
    </div>
  );
}

export default EmployeeViewFilter;
