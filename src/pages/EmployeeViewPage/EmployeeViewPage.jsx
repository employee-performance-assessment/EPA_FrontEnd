import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import { setViewMarks } from '../../store/slices/viewMarksSlices.js';
import styles from './EmployeeViewPage.module.scss';
import {
  getCurrentUser,
  getUserTasksWithStatusByAdmin,
  getTasksByUser,
  getQuestionnaireList,
} from '../../utils/mainApi.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function EmployeeViewPage() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();

  const user = useSelector((state) => state.adminData);
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  const { values, handleChange, setValues } = useFormValidation();
  const [viewTask, setViewTask] = useState(viewMarks);
  const [allMarks, setAllMarks] = useState([]);
  const [currentMarks, setCurrentMarks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [version, setVersion] = useState(0);
  const [employee, setEmployee] = useState({});

  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userData;
        let tasksData;

        if (employeeId && user.role === 'ROLE_ADMIN') {
          userData = await getCurrentUser(employeeId);
          tasksData = await getUserTasksWithStatusByAdmin(employeeId, 'NEW');
        } else {
          userData = await getCurrentUser(user.id);
          tasksData = await getTasksByUser();
        }
        setEmployee(userData);
        setCurrentTasks(tasksData);
      } catch (error) {
        handleError(error);
      }
    };

    fetchData();
  }, [employeeId]);

  useEffect(() => {
    getQuestionnaireList(employeeId)
      .then((res) => {
        setAllMarks(res);
        setCurrentMarks(res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(err);
      });
  }, [employeeId]);

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
    const tasks = await getUserTasksWithStatusByAdmin(employeeId, status);
    setCurrentTasks(tasks);
  }

  return (
    <>
      {isPopupOpen && (
        <InfoPopup
          title={popupTitle}
          text={popupText}
          handleClosePopup={closePopup}
        />
      )}
      <section className={styles.employeeViewPage__container}>
        <EmployeeViewHeader employee={employee} />
        <Switch
          labelLeft="Задачи"
          labelRight="Оценки"
          isChecked={viewTask}
          setIsChecked={setViewTask}
        />
        <EmployeeViewFilter
          handleChange={handleChange}
          showAllCards={showAllCards}
          version={version}
          getTasksByStatus={getTasksByStatus}
        />
        <EmployeeViewBlock
          tasks={currentTasks}
          marks={currentMarks}
          employeeId={employeeId}
        />
      </section>
    </>
  );
}

export default EmployeeViewPage;
