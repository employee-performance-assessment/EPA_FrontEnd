import styles from './EmployeeViewPage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';

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
