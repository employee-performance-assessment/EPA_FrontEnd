import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute';
import InputStars from '../InputStars/InputStars';
import CloseIcon from '../../images/closeIcon.png';
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
}) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const [selectedStatus, setSelectedStatus] = useState('NEW');
  const navigate = useNavigate();
  const { id: employeeId, keyword: searchKeyword } = useParams();

  useEffect(() => {
    searchKeyword && setSearchQuery(searchKeyword);
  }, [searchKeyword])

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    getTasksByStatus(status);
    setSearchQuery('');
  };

  const handleSearchChange = async (evt) => {
    const request = evt.target.value;
    if (request) {
      navigate(
        `${ENDPOINT_ROUTES.cardsEmployees}/${employeeId}/search/${request}`
      );
      setSearchQuery(request);
      handleSearch(request);
    }
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
    <form className={styles.employeeViewFilter__container}>
      {searchQuery ? (
        <>
          <input
            className={styles.employeeViewFilter__input_task}
            type="radio"
            name="filterTask"
            id="all"
            value="all"
            aria-label="Все"
            defaultChecked={searchQuery}
          />
          <label
            className={`${styles.employeeViewFilter__label} ${styles.selected}`}
            htmlFor="new"
          >
            Все
          </label>
        </>
      ) : (
        <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
      )}
      <div
        className={styles.employeeViewFilter__inputs}
        onChange={handleChange}
      >
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="new"
          value="new"
          aria-label="К выполнению"
          defaultChecked={!searchQuery}
          onClick={() => handleStatusChange('NEW')}
        />
        <label
          className={`${styles.employeeViewFilter__label} ${(selectedStatus === 'NEW' && !searchQuery) ? styles.selected : ''}`}
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
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'IN_PROGRESS' && !searchQuery ? styles.selected : ''}`}
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
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'REVIEW' && !searchQuery ? styles.selected : ''}`}
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
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'DONE' && !searchQuery ? styles.selected : ''}`}
        >
          Выполнено
        </label>
      </div>
      <form className={styles.employeeViewFilter__searchForm}>
        <input
          type="text"
          name="search"
          className={styles.employeeViewFilter__input}
          placeholder="Поиск"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className={styles.employeeViewFilter__searchForm_button}
          type="button"
          onClick={handleCloseSearchForm}
        >
          <span
            style={{ backgroundImage: `url(${CloseIcon})` }}
            className={styles.employeeViewFilter__searchForm_icon}
          />
        </button>
      </form>
    </form>
  );
}

export default EmployeeViewFilter;
