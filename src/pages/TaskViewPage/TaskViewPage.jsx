import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomSelect from '../../components/Filter/Filter.jsx';
import { getTaskDetailsByAdmin } from '../../utils/mainApi.js';
import { formatDate } from '../../utils/utils.js';
import styles from './TaskViewPage.module.scss';

function TaskViewPage() {
  const [task, setTask] = useState(null);
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const { fullName: adminName } = useSelector((state) => state.adminData);

  function handleClickBack() {
    navigate(-1);
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByAdmin(taskId)
        .then((res) => {
          if (res) {
            setTask({
              id: res.id,
              name: res.name,
              description: res.description,
              projectName: res.project.name,
              executorName: res.executor.fullName,
              creationDate: formatDate(res.createDate),
              deadline: formatDate(res.deadLine),
              penalty: res.penaltyPoints,
            });
          }
        })
        // eslint-disable-next-line no-alert
        .catch((err) => alert(err));
    }
  }, [taskId]);

  if (!task) {
    return null;
  }

  return (
    <section className={styles.taskViewPage__container}>
      <div className={styles.taskViewPage__header}>
        <div className={styles.taskViewPage__row}>
          <button
            type="button"
            onClick={handleClickBack}
            className={styles.taskViewPage__back}
          >
            <div className={styles.taskViewPage__icon} />
            <p className={styles.taskViewPage__caption}>Назад к задачам</p>
          </button>
          <h4 className={styles.taskViewPage__id}>{task.id}</h4>
          <CustomSelect />
          <button type="button" className={styles.taskViewPage__edit}>
            <div />
            Редактировать
          </button>
        </div>
        <div className={styles.taskViewPage__score}>800 баллов</div>
      </div>

      <div className={styles.taskViewPage__block}>
        <div className={styles.taskViewPage__tasks}>
          <h3>{task.name}</h3>
          <ul>{task.description}</ul>
        </div>
        <div className={styles.taskViewPage__info}>
          <ul className={styles.taskViewPage__props}>
            <li>
              <p className={styles.taskViewPage__name}>Создано</p>
              <p className={styles.taskViewPage__value}>{task.creationDate}</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Дедлайн до</p>
              <p className={styles.taskViewPage__value}>{task.deadline}</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Бонус/Штраф</p>
              <p
                className={styles.taskViewPage__value}
              >{`«${task.penalty}» баллов за день`}</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Исполнитель:</p>
              <p className={styles.taskViewPage__value}>{task.executorName}</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Админ:</p>
              <p className={styles.taskViewPage__value}>{adminName}</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Проект:</p>
              <p className={styles.taskViewPage__value}>{task.projectName}</p>
            </li>
          </ul>
          <button type="button" className={styles.taskViewPage__delete}>
            Удалить задачу
          </button>
        </div>
      </div>
    </section>
  );
}

export default TaskViewPage;
