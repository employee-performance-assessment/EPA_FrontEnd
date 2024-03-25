import './UserForm.scss';
import CloseIcon from '../../images/closeIcon.png';

function UserForm({ formTitle, handleSubmit, children, isValid, handleClosePopup }) {
  return (
    <div className="userForm__wrapper">
      <h3 className="userForm__title">{formTitle}</h3>
      <form className="userForm__form" onSubmit={handleSubmit}>
        <fieldset className="userForm__fieldset">
          {children}
        </fieldset>
        <button type='submit' className='userForm__submit-button' disable={!isValid}>Подтвердить</button>
      </form>
      <button className="userForm__closeIcon-block" type='button' onClick={handleClosePopup}>
          <img
            src={CloseIcon}
            alt="иконка закрытия попапа"
            className="userForm__closeIcon"
          />
        </button>
    </div>
  );
}

export default UserForm;
