import React from 'react';
import Card from '../Card/Card.jsx';
import './Cards.css';

<<<<<<< HEAD
function Cards({ cards, title }) {
  const onEdit = () => {};
  const onDelete = () => {};
  const onMove = () => {};
  return (
    <div className="cards">
      <h2 className="cards__title">{title}</h2>
=======
const Cards = ({ cards, title }) => {
  const onEdit = () => {
  };
  const onDelete = () => {
  };
  const onMove = () => {
  };
  return (
    <div className="cards">
      <h2 className='cards__title'>{title}</h2>
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
      {cards.map((card) => (
        <Card
          title={card.title}
          key={card.id}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178

export default Cards;
