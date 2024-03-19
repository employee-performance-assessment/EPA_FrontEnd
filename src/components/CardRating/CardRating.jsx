import { Link } from 'react-router-dom';
import './CardRating.css';

// принимает рейтинг от 0 до 5, начало недели и конец недели в формате "дд.мм.гггг"
function CardRating({ rating, startDate, endDate }) {
  // закрашиваем звездочки рейтинга с визуальной оптимизацией
  function paintStar(width) {
    if (width >= 1) {
      return 100;
    } else if (width < 1 && width > 0) {
      return (Math.asin(2 * width - 1) / Math.PI + 0.5) * 100;
    } else if (width === 0 || width < 0) {
      return 0;
    }
  }

  // создаем звездочки рейтинга
  function setStars() {
    let widthStar = rating;
    const arrStars = [];
    for (let i = 0; i < 5; i += 1) {
      //console.log(widthStar);
      arrStars.push(
        <div className="card-rating__star card-rating__star_out" key={i}>
          <div
            className="card-rating__star card-rating__star_in"
            style={{ width: `${paintStar(widthStar)}%` }}
          />
        </div>
      );
      widthStar -= 1;
    }
    return arrStars;
  }

  // форматируем текст из формата "дд.мм.гггг" в "дд месяц гггг"
  function formatText() {
    const arrStartDate = startDate.split('.');
    const arrEndDate = endDate.split('.');
    const [startDay, startMonth, startYear] = arrStartDate;
    const [endDay, endMonth, endYear] = arrEndDate;

    return `с ${startDay} ${startMonth === endMonth ? '' : renameMonth(startMonth)} ${startYear === endYear ? '' : startYear} по ${endDay} ${renameMonth(endMonth)} ${endYear}`;
  }

  // переименовываем месяяцы из цифр в слова
  function renameMonth(numberMonth) {
    let month = '';

    switch (numberMonth) {
      case '01':
        month = 'января';
        break;
      case '02':
        month = 'февраля';
        break;
      case '03':
        month = 'марта';
        break;
      case '04':
        month = 'апреля';
        break;
      case '05':
        month = 'мая';
        break;
      case '06':
        month = 'июня';
        break;
      case '07':
        month = 'июля';
        break;
      case '08':
        month = 'августа';
        break;
      case '09':
        month = 'сентября';
        break;
      case '10':
        month = 'октября';
        break;
      case '11':
        month = 'ноября';
        break;
      case '12':
        month = 'декабря';
    }

    return month;
  }

  return (
    // в ссылку передаем путь на страницу с отображением оценок
    <Link Link to={'/'} className="card-rating">
      <div className="card-rating__stars-container">{setStars()}</div>
      <h3 className="card-rating__title">Рейтинг за неделю</h3>
      <p className="card-rating__subtitle">{formatText()}</p>
      <div className="card-rating__button">Подробнее</div>
    </Link>
  );
}

export default CardRating;
