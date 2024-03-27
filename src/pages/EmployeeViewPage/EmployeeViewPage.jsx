import { useEffect, useState } from 'react';
import styles from './EmployeeViewPage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import initTasks from './tasks.json';
import initMarks from './marks.json';

function EmployeeViewPage() {
  const { values, handleChange } = useFormValidation();
  const [view, setView] = useState(false);
  const [marks, setMarks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (values.stars) {
      setMarks(initMarks.filter((i) => Math.round(Number(i.rating)) === Number(values.stars)));
    } else {
      setMarks(initMarks);
    }
    setTasks(initTasks);
  }, [values]);

  return (
    <section className={styles.employeeViewPage__wrapper}>
      <SideMenu />
      <div className={styles.employeeViewPage__container}>
        <EmployeeViewHeader />
        <Checkbox labelLeft={'Задачи'} labelRight={'Оценки'} isChecked={view} setIsChecked={setView} />
        <EmployeeViewFilter view={view} handleChange={handleChange} />
        <EmployeeViewBlock view={view} tasks={tasks} marks={marks} />
      </div>
    </section>
  );
}

export default EmployeeViewPage;
