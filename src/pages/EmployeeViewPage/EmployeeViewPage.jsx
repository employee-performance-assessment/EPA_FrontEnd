import { useState } from 'react';
import styles from './EmployeeViewPage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';

function EmployeeViewPage() {
  const [view, setView] = useState(false);

  return (
    <section className={styles.employeeViewPage__wrapper}>
      <SideMenu />
      <div className={styles.employeeViewPage__container}>
        <EmployeeViewHeader />
        <Checkbox labelLeft={'Задачи'} labelRight={'Оценки'} isChecked={view} setIsChecked={setView} />
        <EmployeeViewFilter />
        <EmployeeViewBlock view={view} />
      </div>
    </section>
  );
}

export default EmployeeViewPage;
