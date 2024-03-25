import checkResponse from './checkResponse.js';
import { USERS, ADMIN_USERS } from '../constants/constantAPI.js';

// проверка токена
export const getUserData = (token) =>
  fetch(`${USERS}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const updateUserData = (id, token, data) =>
  fetch(`${USERS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fullName: data.fullName,
      position: data.position,
      email: data.email,
      password: data.password,
    }),
  }).then((res) => checkResponse(res));

export const getAllUsers = (token) =>
  fetch(USERS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const addNewEmployee = ({ token, fullName, position, email, password }) =>
  fetch(ADMIN_USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, position, email, password }),
  }).then((res) => checkResponse(res));
