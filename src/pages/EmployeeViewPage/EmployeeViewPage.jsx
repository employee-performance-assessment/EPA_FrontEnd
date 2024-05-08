import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';
import SearchedTasks from '../../components/SearchedTasks/SearchedTasks.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import { setViewMarks } from '../../store/slices/viewMarksSlices.js';
import styles from './EmployeeViewPage.module.scss';
import {
  getCurrentUser,
  getUserTasksWithStatusByAdmin,
  getTasksWithStatusByUser,
  getQuestionnaireListByAdmin,
  getQuestionnaireListByUser,
  getRatingByAdmin,
  getRatingByUser,
  getStatPointsByAdmin,
  getStatPointsByUser,
  getUserTasksWithSearchByAdmin,
  getUserTasksWithSearchAndStatusByAdmin,
  getTasksWithSearchByUser,
  getTasksWithSearchAndStatusByUser,
} from '../../utils/mainApi.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';
import { getFromLocalStorage } from '../../utils/localStorageFunctions.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function EmployeeViewPage() {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const [viewTask, setViewTask] = useState(viewMarks);
  const [allMarks, setAllMarks] = useState([]);
  const [currentMarks, setCurrentMarks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [version, setVersion] = useState(0);
  const [employee, setEmployee] = useState({});

  const [rating, setRating] = useState(0);
  const [points, setPoints] = useState(0);
  const [isSearching, setIsSearching] = useState(true);
  const [searchedTasks, setSearchedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { id: employeeId, keyword: searchKeyword } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = getFromLocalStorage('user');

  const { values, handleChange, setValues } = useFormValidation();
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setSearchQuery(searchKeyword);
      try {
        setLoading(true);
        let userData;
        let tasksData;
        let ratingData;
        let pointsData;
        let questionnaireList;

        if (employeeId && user.isAdmin) {
          userData = await getCurrentUser(employeeId);
          tasksData = await getUserTasksWithStatusByAdmin(employeeId, 'NEW');
          ratingData = await getRatingByAdmin(employeeId);
          pointsData = await getStatPointsByAdmin(employeeId);
          questionnaireList = await getQuestionnaireListByAdmin(employeeId);
        } else {
          userData = await getCurrentUser(user.id);
          tasksData = await getTasksWithStatusByUser('NEW');
          ratingData = await getRatingByUser();
          pointsData = await getStatPointsByUser();
          questionnaireList = await getQuestionnaireListByUser();
        }
        setEmployee(userData);
        setCurrentTasks(tasksData);
        setRating(ratingData);
        setPoints(pointsData);
        setAllMarks(questionnaireList);
        setCurrentMarks(questionnaireList);
      } catch (error) {
        handleError(error);
      }
      setLoading(false);
    };

    !searchKeyword && fetchData();
  }, [employeeId, searchKeyword, isSearching]);

  useEffect(() => {
    const getSearchResults = async () => {
      setSearchQuery(searchKeyword);
      try {
        setLoading(true);
        let userData;
        let tasksData;
        let ratingData;
        let pointsData;
        let questionnaireList;

        if (employeeId && searchKeyword && user.isAdmin) {
          userData = await getCurrentUser(employeeId);
          tasksData = await getUserTasksWithSearchByAdmin(
            employeeId,
            searchKeyword
          );
          ratingData = await getRatingByAdmin(employeeId);
          pointsData = await getStatPointsByAdmin(employeeId);
          questionnaireList = await getQuestionnaireListByAdmin(employeeId);
        } else if (searchKeyword && !user.isAdmin) {
          userData = await getCurrentUser(user.id);
          tasksData = await getTasksWithSearchByUser(searchKeyword); // ??
          ratingData = await getRatingByUser();
          pointsData = await getStatPointsByUser();
          questionnaireList = await getQuestionnaireListByUser();
        }
        setEmployee(userData);
        setCurrentTasks(tasksData);
        setRating(ratingData);
        setPoints(pointsData);
        setAllMarks(questionnaireList);
        setCurrentMarks(questionnaireList);
      } catch (error) {
        handleError(error);
      }
      setLoading(false);
    };

    searchKeyword && getSearchResults();
  }, [searchKeyword, employeeId, isSearching]);

  // Сортировка анкет по дате
  useEffect(() => {
    const sorted = allMarks.sort((a, b) =>
      b.createQuestionnaire.localeCompare(a.createQuestionnaire)
    );
    setAllMarks(sorted);
  }, []);

  useEffect(() => {
    if (values.stars) {
      setCurrentMarks(
        allMarks.filter(
          (i) => Math.round(Number(i.middleScore)) === Number(values.stars)
        )
      );
    } else {
      setCurrentMarks(allMarks);
    }
  }, [values]);

  useEffect(() => {
    dispatch(setViewMarks(viewTask));
  }, [viewTask]);

  function showAllCards() {
    setCurrentMarks(allMarks);
    setValues({});
    resetStarsFilter();
  }

  function resetStarsFilter() {
    setVersion(version + 1);
  }

  async function getTasksByStatus(status) {
    setLoading(true);
    try {
      const tasks = user.isAdmin
        ? await getUserTasksWithStatusByAdmin(employeeId, status)
        : await getTasksWithStatusByUser(status);

      setCurrentTasks(tasks);
    } catch (err) {
      handleError(err);
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  }

  async function getTasksByStatusAndKeyword(status, keyword) {
    try {
      let tasksByStatusAndKeyword;

      if (user.isAdmin) {
        tasksByStatusAndKeyword = await getUserTasksWithSearchAndStatusByAdmin(
          employeeId,
          status,
          keyword
        );
      } else {
        tasksByStatusAndKeyword = await getTasksWithSearchAndStatusByUser(
          status,
          keyword
        );
      }

      setSearchedTasks(tasksByStatusAndKeyword);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleSearch(searchQuery) {
    setIsSearching(true);
    try {
      let searchTasks;
      if (user.isAdmin) {
        searchTasks = await getUserTasksWithSearchByAdmin(
          employeeId,
          searchQuery
        );
      } else {
        searchTasks = await getTasksWithSearchByUser(searchQuery);
      }
      setSearchedTasks(searchTasks);
    } catch (err) {
      handleError(err);
    } finally {
      setIsSearching(false);
    }
  }

  function handleCloseSearchForm() {
    setSearchQuery('');
    setIsSearching(false);
    const redirectPath = user.isAdmin
    ? `${ENDPOINT_ROUTES.cardsEmployees}/${employeeId}`
    : ENDPOINT_ROUTES.userArea;

  navigate(redirectPath);
  }

  function handleSwitch() {
    setViewTask(!viewTask);
    setSearchQuery('');
    setIsSearching(false);
    searchKeyword && setSearchQuery(searchKeyword);
  }

  return (
    <>
      {isLoading && <Loader />}
      {isPopupOpen && (
        <InfoPopup text={popupText} handleClosePopup={closePopup} />
      )}
      <section className={styles.employeeViewPage__container}>
        <EmployeeViewHeader
          employee={employee}
          rating={rating}
          points={points}
        />
        <Switch
          labelLeft="Задачи"
          labelRight="Оценки"
          isChecked={viewTask}
          handleChange={handleSwitch}
        />
        <EmployeeViewFilter
          handleChange={handleChange}
          showAllCards={showAllCards}
          version={version}
          getTasksByStatus={getTasksByStatus}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleCloseSearchForm={handleCloseSearchForm}
          getTasksByStatusAndKeyword={getTasksByStatusAndKeyword}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        {searchKeyword && !viewTask ? (
          <SearchedTasks tasks={searchedTasks} />
        ) : (
          <EmployeeViewBlock
            tasks={currentTasks}
            marks={currentMarks}
            employeeId={employeeId}
          />
        )}
      </section>
    </>
  );
}

export default EmployeeViewPage;
