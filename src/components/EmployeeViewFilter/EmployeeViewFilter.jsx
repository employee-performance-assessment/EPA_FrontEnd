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
  setSearchQuery,
  handleCloseSearchForm,
  getTasksByStatusAndKeyword
}) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  const navigate = useNavigate();
  const { id: employeeId, keyword: searchKeyword } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(searchKeyword ? '' : "NEW");

  useEffect(() => {
    if(searchKeyword) {
      setSearchQuery(searchKeyword);
      setSelectedStatus('');
    } else {
      setSelectedStatus('NEW');
    }
  }, [searchKeyword])

  const handleStatusChange = (status) => {
    if(status) {
      setSelectedStatus(status);
      searchKeyword ? getTasksByStatusAndKeyword(status, searchKeyword) : getTasksByStatus(status);
    } else {
      setSelectedStatus('');
      handleSearch(searchKeyword);
    }
  };

  const handleSearchChange = (evt) => {
    const request = evt.target.value;
    if (request) {
      navigate(
        `${ENDPOINT_ROUTES.cardsEmployees}/${employeeId}/search/${request}`
      );
      setSearchQuery(request);
      handleSearch(request);
      setSelectedStatus('');
    } else {
      navigate(`${ENDPOINT_ROUTES.cardsEmployees}/${employeeId}`);
      setSelectedStatus('');
    }
  };

  const clearSearchForm = () => {
    handleCloseSearchForm();
    setSelectedStatus('NEW');
  }

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
        onChange={handleChange}
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
      <div className={styles.employeeViewFilter__searchForm}>
        <input
          type="text"
          name="search"
          className={styles.employeeViewFilter__input}
          placeholder="Поиск"
          value={searchKeyword || ''}
          onChange={handleSearchChange}
        />
        <button
          className={styles.employeeViewFilter__searchForm_button}
          type="button"
          onClick={clearSearchForm}
        >
          <span
            style={{ backgroundImage: `url(${CloseIcon})` }}
            className={styles.employeeViewFilter__searchForm_icon}
          />
        </button>
      </div>
    </form>
  );
}

export default EmployeeViewFilter;
