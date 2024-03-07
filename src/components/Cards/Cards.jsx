import React from 'react';
import Card from '../Card/Card.jsx';
import './Cards.css';

function Cards({ cards, title }) {
  const onEdit = () => {};
  const onDelete = () => {};
  const onMove = () => {};
  return (
    <div className="cards">
      <h2 className="cards__title">{title}</h2>
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
}

export default Cards;
