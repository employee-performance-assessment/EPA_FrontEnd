import { useState } from 'react';
import Switch from '../../components/Switch/Switch.jsx';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import RatingsAnalytics from '../../components/RatingsAnalytics/RatingsAnalytics.jsx';
import DeadlineAnalytics from '../../components/DeadlineAnalytics/DeadlineAnalytics.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import useLoading from '../../hooks/useLoader.js';
import styles from './AnalyticsPage.module.scss';

function AnalyticsPage() {
  const [isDeadline, setIsDeadline] = useState(true);
  const { isLoading, setLoading } = useLoading();
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();

  return (
    <section className={styles.page}>
      {isLoading && <Loader />}
      {isPopupOpen && <InfoPopup text={popupText} handleClosePopup={closePopup} />}
      <div
        style={isDeadline ? { background: 'white' } : null}
        className={styles.container}
      >
        <header className={styles.header}>
          <div className={styles.analytic}>
            <span>Аналитика</span>
          </div>
          <Switch
            shadow="none"
            labelLeft="Оценки"
            labelRight="Дедлайны"
            isChecked={isDeadline}
            setIsChecked={setIsDeadline}
          />
        </header>
        {isDeadline ?
          <DeadlineAnalytics
            setLoading={setLoading}
            handleError={handleError}
          /> :
          <RatingsAnalytics
            setLoading={setLoading}
            handleError={handleError}
          />}
      </div>
    </section>
  );
}

export default AnalyticsPage;
