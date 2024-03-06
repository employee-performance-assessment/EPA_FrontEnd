import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/* Primary UI component for user interaction */
<<<<<<< HEAD
function Button({ primary, backgroundColor, size, label, onClick }) {
=======
function Button({
  primary, backgroundColor, size, label, onClick,
}) {
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(
<<<<<<< HEAD
        ' '
=======
        ' ',
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
      )}
      style={backgroundColor && { backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;

Button.propTypes = {
  /* Is this the principal call to action on the page? */
  primary: PropTypes.bool,
  /* What background color to use */
  backgroundColor: PropTypes.string,
  /* How large should the button be? */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /* Button contents */
  label: PropTypes.string.isRequired,
  /* Optional click handler */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
