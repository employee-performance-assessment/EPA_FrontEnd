import './CriterionInput.scss';

function CriterionInput({
  criterion,
  text,
  editing,
  handleDelete,
  values,
  handleChange,
  id
}) {

  if (!values[String(id)]) {
    values[String(id)] = text;
  }

  return (
    <div className="criterion">
      <input
        className={`criterion__input ${editing && 'criterion__input_active'}`}
        name={String(id)}
        type="text"
        placeholder="Введите новый критерий оценки"
        value={values[String(id)] || ''}
        disabled={!editing}
        onChange={handleChange}
      />
      {editing &&
        <div className="criterion__button" onClick={() => handleDelete(criterion)} />}
    </div>
  );
}

export default CriterionInput;
