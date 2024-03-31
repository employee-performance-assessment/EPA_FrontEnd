import { useFormValidation } from '../../hooks/useFormValidation';
import './CriterionInput.scss';

function CriterionInput({ criterion, name, editing, handleDelete }) {
  const { values, handleChange } = useFormValidation();

  if (!values.name) {
    values.name = name;
  }

  return (
    <div className="criterion">
      <input
        className={`criterion__input ${editing && 'criterion__input_active'}`}
        name="name"
        type="text"
        placeholder={'Введите новый критерий оценки'}
        value={values.name || ''}
        disabled={!editing}
        onChange={handleChange}
      />
      {editing &&
        <div className="criterion__button" onClick={() => handleDelete(criterion)} />}
    </div>
  );
}

export default CriterionInput;
