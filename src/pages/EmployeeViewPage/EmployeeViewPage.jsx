import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import { setViewMarks } from '../../store/slices/viewMarksSlices.js';
import styles from './EmployeeViewPage.module.scss';
import initMarks from './marks.json';
import { getCurrentUser, getAllUserTasksByAdmin } from '../../utils/mainApi.js';

function EmployeeViewPage() {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useFormValidation();
  const [viewTask, setViewTask] = useState(viewMarks);
  const [marks, setMarks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [version, setVersion] = useState(0);
  const { id: employeeId } = useParams();

  const [employee, setEmployee] = useState({});
  const [tasksStatus, setTasksStatus] = useState('NEW');

  useEffect(() => {
    if (employeeId) {
      getCurrentUser(employeeId)
        .then((res) => {
          setEmployee(res);
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err);
        });
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeId) {
      getAllUserTasksByAdmin(employeeId)
        .then((res) => {
          setAllTasks(res);
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err);
        });
    }
  }, [employeeId]);


  useEffect(() => {
    if (!allTasks.length) return;

    setCurrentTasks(
      allTasks.filter((task) => tasksStatus ? task.status === tasksStatus : true)
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
      <EmployeeViewBlock tasks={currentTasks} marks={marks} employeeId={employeeId}/>
    </section>
  );
}

export default EmployeeViewPage;
