import './CriterionInput.scss';

function CriterionInput({
  criterion,
  editing,
  handleDelete,
  values,
  handleChange,
  id
}) {
  return (
    <div className="criterion">
      <input
        className={`criterion__input ${editing && 'criterion__input_active'}`}
        name={id}
        type="text"
        placeholder="Введите новый критерий оценки"
        value={values || ''}
        disabled={!editing}
        onChange={handleChange}
        pattern="^[A-Za-zА-Яа-яЁё0-9.,:;?!*+%\-<>@\[\]\/\\_\{\}\$\#\s]{1,100}$"
        minLength={1}
        maxLength={100}
        required
      />
      {editing &&
        <button
          type="button"
          className="criterion__button"
          onClick={(e) => handleDelete(criterion, e)} />}
    </div>
  );
}

export default CriterionInput;
