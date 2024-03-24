import './UserForm.scss';

function UserForm({ formTitle, handleSubmit, children, isValid }) {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const { values, handleChange, errors, setErrors, isValid } =
  // useFormValidation({
  //   name: '',
  //   position: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  return (
    <div className="userForm__wrapper">
      <h3 className="userForm__title">{formTitle}</h3>
      <form className="userForm__form" onSubmit={handleSubmit}>
        <fieldset className="userForm__fieldset">
          {children}
        </fieldset>
        <button type='submit' className='userForm__submit-button' disable={!isValid}>Подтвердить</button>
      </form>
    </div>
  );
}

export default UserForm;
