import React from 'react';
<<<<<<< HEAD

function AdminPanel() {
  return (
    <div className="AdminPanel">
      <h1>Admin panel</h1>
=======
import './AdminPanel.scss';
import Card from '../Card/Card.jsx';

function AdminPanel() {
  return (
    <div className="AdminPanel__conainer">
      <div className="AdminPanel__sidebar">
        <h1>Admin panel</h1>

        <ul className="AdminPanel__list">
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
          <li className="AdminPanel__item">
            <Card />
          </li>
        </ul>
      </div>
      <div className="AdminPanel__main"></div>
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
    </div>
  );
}
export default AdminPanel;
