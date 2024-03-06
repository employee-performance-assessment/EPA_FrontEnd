import checkResponse from './checkResponse.js';
import {
<<<<<<< HEAD
  /* main, */ auth /* , board, personalArea, adminPanel, anyPage, */,
} from '../constants/constantAPI.js';

// проверка токена
export const chekTokenUser = (token) =>
  fetch(`${auth}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const register = (name, email, password) =>
  fetch(`${auth}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));

export const authorize = (email, password) =>
  fetch(`${auth}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
=======
  /* main, */ auth, /* , board, personalArea, adminPanel, anyPage, */
} from '../constants/constantAPI.js';

// проверка токена
export const chekTokenUser = (token) => fetch(`${auth}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => checkResponse(res));

export const register = (name, email, password) => fetch(`${auth}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, email, password }),
}).then((res) => checkResponse(res));

export const authorize = (email, password) => fetch(`${auth}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).then((res) => checkResponse(res));
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
