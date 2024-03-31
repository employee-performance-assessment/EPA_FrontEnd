import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import { setViewMarks } from '../../store/slices/viewMarksSlices.js';
import styles from './EmployeeViewPage.module.scss';
import initTasks from './tasks.json';
import initMarks from './marks.json';

function EmployeeViewPage() {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useFormValidation();
  const [viewTask, setViewTask] = useState(viewMarks);
  const [marks, setMarks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (values.stars) {
      setMarks(initMarks.filter((i) => Math.round(Number(i.rating)) === Number(values.stars)));
    } else {
      setMarks(initMarks);
    }

    if (values.filterTask) {
      setTasks(initTasks.filter((i) => i.status === values.filterTask));
    } else {
      setTasks(initTasks.filter((i) => i.status === 'new'));
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
      <EmployeeViewHeader />
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
      />
      <EmployeeViewBlock tasks={tasks} marks={marks} />
    </section>
  );
}

export default EmployeeViewPage;
