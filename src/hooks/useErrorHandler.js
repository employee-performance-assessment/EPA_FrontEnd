import { useState } from 'react';

export const useErrorHandler = () => {
  const [popupText, setPopupText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleError = (error) => {
    error.json()
      .then((res) => {
        setPopupText(res.message);
        setIsPopupOpen(true);
      })
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return { popupText, isPopupOpen, setIsPopupOpen, handleError, closePopup };
};
