export const ERRORS = {
  code400: 'Error: 400',
  code401: 'Error: 401',
  code403: 'Error: 403',
  code404: 'Error: 404',
  code409: 'Error: 409',
  code500: 'Error: 500',
};

export const RESPONSE_TITLES = {
  // email: 'Пользователь с таким email уже существует',
  email: 'Ошибка почты',
  server: 'Ошибка сервера',
  login: 'Неверная почта или пароль',
  auth: 'Ошибка авторизации',
  notFound: 'Ресурс не найден',
  badRequest: 'Ошибка запроса',
  forbidden: 'Доступ запрещен',
};

export const RESPONSE_MESSAGES = {
  errorEmail: 'Проверьте правильность написания email, пользователь с таким email уже существует.',
  errorServer: 'Что-то пошло не так! Попробуйте ещё раз позже.',
  errorLogin: 'Введенные данные не совпадают с сохраненными в нашей базе данных. Проверьте правильность введенных данных и повторите попытку.',
  errorAuth: 'Необходимо пройти авторизацию.',
  errorBadRequest: 'Пожалуйста, проверьте введенные данные и повторите попытку.',
  errorForbidden: 'У вас нет разрешения на доступ к этому ресурсу.',
  errorNotFound: 'Запрашиваемый ресурс не найден. Пожалуйста, проверьте правильность URL или параметров запроса.',
};


export const handleError = ({error, setPopupTitle, setPopupText}) => {
  switch (error) {
    case ERRORS.code409:
      setPopupTitle(RESPONSE_TITLES.email);
      setPopupText(RESPONSE_MESSAGES.errorEmail);
      break;
    case ERRORS.code500:
      setPopupTitle(RESPONSE_TITLES.server);
      setPopupText(RESPONSE_MESSAGES.errorServer);
      break;
    case ERRORS.code401:
      setPopupTitle(RESPONSE_TITLES.auth);
      setPopupText(RESPONSE_MESSAGES.errorAuth);
      break;
    case ERRORS.code403:
      setPopupTitle(RESPONSE_TITLES.forbidden);
      setPopupText(RESPONSE_MESSAGES.errorForbidden);
      break;
    case ERRORS.code400:
      setPopupTitle(RESPONSE_TITLES.badRequest);
      setPopupText(RESPONSE_MESSAGES.errorBadRequest);
      break;
    default:
      setPopupTitle(RESPONSE_TITLES.server);
      setPopupText(RESPONSE_MESSAGES.errorServer);
  }
};