import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomSelect from '../../components/CustomSelect/CustomSelect.jsx';
import {
  getTaskDetailsByAdmin,
  deleteTaskByAdmin,
  getTaskDetailsByUser,
  getProjectsName,
} from '../../utils/mainApi.js';
import { formatDate } from '../../utils/utils.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import PopupEditTask from '../../components/PopupEditTask/PopupEditTask.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';
import styles from './TaskViewPage.module.scss';
import { getFromLocalStorage } from '../../utils/localStorageFunctions.js';

function TaskViewPage() {
  const [task, setTask] = useState(null);
  const [isEditTaskFormOpen, setIsEditTaskFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isTaskEdited, setIsTaskEdited] = useState(false);
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const user = getFromLocalStorage('user');
  const { popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (taskId) {
          if (user.isAdmin) {
            const res = await getTaskDetailsByAdmin(taskId);
            res &&
              setTask({
                id: res.id,
                name: res.name,
                description: res.description,
                projectName: res.project.name,
                projectId: res.project.id,
                executorName: res.executor.fullName,
                executorId: res.executor.id,
                creationDate: formatDate(res.createDate),
                deadLine: res.deadLine,
                deadLineFormated: formatDate(res.deadLine),
                penaltyPoints: res.penaltyPoints,
                basicPoints: res.basicPoints,
                status: res.status,
                admin: user.fullName,
              });

            const projectsRes = await getProjectsName();
            setProjects(projectsRes);
          } else {
            const res = await getTaskDetailsByUser(taskId);
            res &&
              setTask({
                id: res.id,
                name: res.name,
                description: res.description,
                creationDate: formatDate(res.createDate),
                deadLineFormated: formatDate(res.deadLine),
                penaltyPoints: res.penaltyPoints,
                basicPoints: res.basicPoints,
                executorName: res.executor.fullName,
                admin: res.owner.fullName,
                projectName: res.project.name,
                status: res.status,
              });
          }
        }
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [taskId, user.isAdmin, isTaskEdited]);

  function handleDeleteTask() {
    setLoading(true);
    deleteTaskByAdmin(taskId)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => setLoading(false));
  }

  if (!task) {
    return null;
  }

  return (
    <>
      {isLoading && <Loader />}
      {isPopupOpen && (
        <InfoPopup
          text={popupText}
          handleClosePopup={closePopup}
        />
      )}
      {isEditTaskFormOpen && (
        <PopupEditTask
          title="Редактировать"
          setIsOpenPopup={setIsEditTaskFormOpen}
          projects={projects}
          taskOldContent={{
            name: task.name,
            description: task.description,
            project: { name: task.projectName, id: task.projectId },
            employee: { name: task.executorName, id: task.executorId },
            deadLine: task.deadLine,
            status: task.status,
            basicPoints: task.basicPoints,
            penaltyPoints: task.penaltyPoints,
            taskId: task.id,
          }}
          setIsTaskEdited={setIsTaskEdited}
        />
      )}
      <section className={styles.taskViewPage__container}>
        <div className={styles.taskViewPage__header}>
          <div className={styles.taskViewPage__row}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.taskViewPage__back}
            >
              <div className={styles.taskViewPage__icon} />
              <p className={styles.taskViewPage__caption}>Назад к задачам</p>
            </button>
            <h4 className={styles.taskViewPage__id}>{task.id}</h4>
            <CustomSelect task={task} />
            {user.isAdmin && (
              <button
                type="button"
                className={styles.taskViewPage__edit}
                onClick={() => setIsEditTaskFormOpen(true)}
              >
                <div />
                Редактировать
              </button>
            )}
          </div>
          <div className={styles.taskViewPage__score}>
            {task.basicPoints} баллов
          </div>
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
                <p className={styles.taskViewPage__value}>
                  {task.creationDate}
                </p>
              </li>
              <li>
                <p className={styles.taskViewPage__name}>Дедлайн до</p>
                <p className={styles.taskViewPage__value}>
                  {task.deadLineFormated}
                </p>
              </li>
              <li>
                <p className={styles.taskViewPage__name}>Бонус/Штраф</p>
                <p
                  className={styles.taskViewPage__value}
                >{`«${task.penaltyPoints}» баллов за день`}</p>
              </li>
              <li>
                <p className={styles.taskViewPage__name}>Исполнитель:</p>
                <p className={styles.taskViewPage__value}>
                  {task.executorName}
                </p>
              </li>
              <li>
                <p className={styles.taskViewPage__name}>Админ:</p>
                <p className={styles.taskViewPage__value}>{task.admin}</p>
              </li>
              <li>
                <p className={styles.taskViewPage__name}>Проект:</p>
                <p className={styles.taskViewPage__value}>{task.projectName}</p>
              </li>
            </ul>
            {user.isAdmin && (
              <button
                type="button"
                className={styles.taskViewPage__delete}
                onClick={handleDeleteTask}
              >
                Удалить задачу
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskViewPage;
