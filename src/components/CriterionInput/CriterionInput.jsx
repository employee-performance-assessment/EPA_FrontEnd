import { useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import './CriterionInput.scss';

function CriterionInput({ card, text, editing, handleDelete }) {
  const [edit, setEdit] = useState(false);
  const { values, handleChange } = useFormValidation();

  function setVisibleInputData() {
    if (!values.text && !edit) {
      values.text = text;
    }
  }

  setVisibleInputData();

  function handleEdit() {
    setEdit(!edit);
  }

  return (
    <div className="criterion">
      <input
        className={`criterion__input ${edit && editing && 'criterion__input_active'}`}
        name="text"
        type="text"
        placeholder={'Введите новый критерий оценки'}
        value={values.text || ''}
        disabled={!editing || !edit}
        onChange={handleChange}
      />
      {editing &&
        <div className="criterion__buttons">
          <div className="criterion__button criterion__button_edit" onClick={handleEdit} />
          <div className="criterion__button criterion__button_delete" onClick={() => handleDelete(card)} />
        </div>}
    </div>
  );
}

export default CriterionInput;
