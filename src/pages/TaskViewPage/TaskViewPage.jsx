import { Link } from 'react-router-dom';
import styles from './TaskViewPage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu.jsx';
import CustomSelect from '../../components/Filter/Filter.jsx';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';

function TaskViewPage() {
  const { viewCards } = ENDPOINT_ROUTES;

  return (
    <section className={styles.taskViewPage__wrapper}>
      <SideMenu />
      <div className={styles.taskViewPage__container}>
        <div className={styles.taskViewPage__header}>
          <div className={styles.taskViewPage__row}>
            <Link to={viewCards} className={styles.taskViewPage__link}>
              <div className={styles.taskViewPage__icon}></div>
              <p className={styles.taskViewPage__caption}>Назад </p>
            </Link>
            <h4 className={styles.taskViewPage__number}>125022024</h4>
            <CustomSelect />
            <button type="button" className={styles.taskViewPage__edit}>
              <div></div>
              Редактировать
            </button>
          </div>
          <div className={styles.taskViewPage__score}>800 баллов</div>
        </div>

        <div className={styles.taskViewPage__block}>
          <div className={styles.taskViewPage__tasks}>
            <h3>
              Cоздать дизайн мобильного приложения для онлайн-шоппинга в сфере
              IT- технологий, которое будет включать следующие функции:
            </h3>
            <ul>
              <li>
                Главная страница с изображением популярных продуктов и функцией
                быстрого поиска.
              </li>
              <li>
                Каталог товаров с категориями и фильтром для поиска по цене и
                рейтингу.
              </li>
              <li>
                Карточка товара с подробным описанием, фотографиями и отзывами
                покупателей.
              </li>
              <li>
                Функция сравнения товаров для выбора наиболее подходящего
                варианта.
              </li>
              <li>
                Личный кабинет с историей покупок и возможностью добавления
                товаров в избранное.
              </li>
              <li>
                Раздел “Рекомендуемые товары” на основе истории просмотров и
                покупок пользователя.
              </li>
              <li>
                Интеграция с социальными сетями для быстрого входа и обмена
                отзывами с друзьями.
              </li>
              <li>Возможность оформления заказа и оплаты через приложение.</li>
              <li>
                Адаптивный дизайн для удобного использования на различных
                устройствах.
              </li>
            </ul>
          </div>

          <ul className={styles.taskViewPage__props}>
            <li>
              <p className={styles.taskViewPage__name}>Создано</p>
              <p className={styles.taskViewPage__value}>24 февраля 2024</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Дедлайн до</p>
              <p className={styles.taskViewPage__value}>2 марта 2024</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Бонус/Штраф</p>
              <p className={styles.taskViewPage__value}>«100» баллов за день</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Исполнитель:</p>
              <p className={styles.taskViewPage__value}>Иван Иванов</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Админ:</p>
              <p className={styles.taskViewPage__value}>Василий Смирнов</p>
            </li>
            <li>
              <p className={styles.taskViewPage__name}>Проект:</p>
              <p className={styles.taskViewPage__value}>Linkpass</p>
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
