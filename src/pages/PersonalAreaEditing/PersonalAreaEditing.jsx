import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import PersonalAreaHeader from '../../components/PersonalAreaHeader/PersonalAreaHeader.jsx';
import PersonalAreaForm from '../../components/PersonalAreaForm/PersonalAreaForm.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import '../PersonalArea/PersonalArea.scss';

function PersonalAreaEditing() {
  const { popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();

  return (
    <section className="personal-area">
      {isPopupOpen && <InfoPopup text={popupText} handleClosePopup={closePopup} />}
      <PersonalAreaHeader />
      <div className="personal-area__section">
        <PersonalAreaForm handleError={handleError} />
      </div>
    </section>
  );
}

export default PersonalAreaEditing;