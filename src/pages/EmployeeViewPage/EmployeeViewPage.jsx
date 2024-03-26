import styles from './EmployeeViewPage.module.scss';
import SideMenu from '../SideMenu/SideMenu.jsx';
import EmployeeViewHeader from '../EmployeeViewHeader/EmployeeViewHeader.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import EmployeeViewFilter from '../EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../EmployeeViewBlock/EmployeeViewBlock.jsx';

function EmployeeViewPage() {
  return (
    <section className={styles.employeeViewPage__wrapper}>
      <SideMenu />
      <div className={styles.employeeViewPage__container}>
        <EmployeeViewHeader />
        <Checkbox labelLeft={'Задачи'} labelRight={'Оценки'}/>
        <EmployeeViewFilter />
        <EmployeeViewBlock />
      </div>
    </section>
  );
}

export default EmployeeViewPage;
