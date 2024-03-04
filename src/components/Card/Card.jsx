import React, { useState } from 'react';
import './Card.scss';
import deleteButton from '../../images/delete_button.svg';
import editButton from '../../images/edit_button.svg';
import saveButton from '../../images/save_button.svg';

function Card({
  title, key, onEdit, onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [containerContent, setContainerContent] = useState(title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(key, title); // Передаем id и отредактированное содержимое контейнера
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(key); // Передаем id для удаления контейнера
  };

  // const handleMove = () => {
  //   onMove(key); // Передаем id для перемещения контейнера
  // };

  return (
    <div key={key} className="card">
      {isEditing ? (
        <input
          className=""
          value={title}
          onChange={(e) => setContainerContent(e.target.value)}
        />
      ) : (
        <div className="card__title">{containerContent}</div>
      )}

      {/* Кнопки редактирования, удаления и перемещения */}
      <div className="card__buttons-conteiner">
        <button onClick={handleEdit} className="card__button">
          {isEditing ? (
            <img
              className="card__button-image"
              src={editButton}
              alt="логотип"
            />
          ) : (
            <img
              className="card__button-image"
              src={saveButton}
              alt="логотип"
            />
          )}
        </button>
        <button className="card__button" onClick={handleDelete}>
          <img
            className="card__button-image"
            src={deleteButton}
            alt="логотип"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
//   return (
//     <div className="card">
//       <h2 className="card-title">Organizer Card</h2>
//       <p className="card-content">
//         This is a demo organizer card. You can use it to organize your tasks and
//         notes.
//       </p>
//       <div className="card-footer">
//         <button className="button">Edit</button>
//         <button className="button">Delete</button>
//       </div>
//     </div>
//   );
// export default Card;
