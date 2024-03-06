import React from 'react';
import './Preloader.css';

<<<<<<< HEAD
function Preloader({ text, classNameMod }) {
  return (
=======
const Preloader = ({ text, classNameMod }) => (
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
    <div
      className={`preloader ${classNameMod ? `preloader_${classNameMod}` : ''}`}
    >
      <div
        className={`preloader__container ${
          classNameMod ? `preloader__container_${classNameMod}` : ''
        }`}
      >
        <span
          className={`preloader__round ${
            classNameMod ? `preloader__round_${classNameMod}` : ''
          }`}
        >
          {text}
        </span>
      </div>
    </div>
<<<<<<< HEAD
  );
}
=======
);
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178

export default Preloader;
