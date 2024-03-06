import React from 'react';
import './Form.css';

<<<<<<< HEAD
function Form({ fields, buttonText, onSubmit, isValid, modifierCSS }) {
=======
function Form({
  fields,
  buttonText,
  onSubmit,
  isValid,
  modifierCSS,
}) {
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
  const valuesForm = {};

  fields.forEach((item) => (valuesForm[item.name] = item.valueInput));
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(valuesForm);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {fields.map((item) => (
        <label
          className={modifierCSS ? 'form__field_profile' : 'form__field'} //! !!!!!!!!!!!!!
          key={item.name}
        >
          {item.title}
          <input
            name={item.name}
            className={modifierCSS ? 'form__input_profile' : 'form__input'}
            id={item.id}
            type={item.type}
            onChange={item.onChange}
            value={item.valueInput}
            required
          />
          <span className="form__input-error">
            {item.inputDitry ? (item.inputError ? item.inputError : '') : ''}
          </span>
        </label>
      ))}
      <div className="form__conteiner-button">
        <span className="form__request-error">
          {/* requestError.length > 0 ? requestError : */ ''}
        </span>
        <button
          type="submit"
<<<<<<< HEAD
          className={`form__button-save ${
            isValid ? '' : 'form__button-save_inactive'
=======
          className={`form__button-save ${isValid ? '' : 'form__button-save_inactive'
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
          }`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default Form;
