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
import initMarks from './marks.json';
import {
  getCurrentUser,
  getAllUserTasksByAdmin,
  getTasksByUser,
} from '../../utils/mainApi.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function EmployeeViewPage() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();

  const user = useSelector((state) => state.adminData);
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  const { values, handleChange, setValues } = useFormValidation();
  const [viewTask, setViewTask] = useState(viewMarks);
  const [marks, setMarks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [version, setVersion] = useState(0);
  const [employee, setEmployee] = useState({});
  const [tasksStatus, setTasksStatus] = useState('NEW');

  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userData;
        let tasksData;

        if (employeeId && user.role === 'ROLE_ADMIN') {
          userData = await getCurrentUser(employeeId);
          tasksData = await getAllUserTasksByAdmin(employeeId);
        } else {
          userData = await getCurrentUser(user.id);
          tasksData = await getTasksByUser();
        }

        setEmployee(userData);
        setAllTasks(tasksData);
      } catch (error) {
        handleError(error);
      }
    };

    fetchData();
  }, [employeeId]);

  useEffect(() => {
    if (!allTasks.length) return;

    setCurrentTasks(
      allTasks.filter((task) =>
        tasksStatus ? task.status === tasksStatus : true
      )
    );
  }, [tasksStatus, allTasks]);

  useEffect(() => {
    if (values.stars) {
      setMarks(
        initMarks.filter(
          (i) => Math.round(Number(i.rating)) === Number(values.stars)
        )
      );
    } else {
      setMarks(initMarks);
    }
  }, [values]);

  useEffect(() => {
    dispatch(setViewMarks(viewTask));
  }, [viewTask]);

  function showAllCards() {
    setMarks(initMarks);
    setValues({});
    resetStarsFilter();
  }

  function resetStarsFilter() {
    setVersion(version + 1);
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
          setTasksStatus={setTasksStatus}
        />
        <EmployeeViewBlock
          tasks={currentTasks}
          marks={marks}
          employeeId={employeeId}
        />
      </section>
    </>
  );
}

export default EmployeeViewPage;
