import checkResponse from './checkResponse';
import { endpointAuth, endpointRegister } from '../constants/constantAPI.js';

// проверка токена
export const chekTokenUser = (token) =>
  fetch(endpointAuth, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const register = ({ fullName, email, password }) =>
  fetch(endpointRegister, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ fullName, email, password }),
  }).then((res) => checkResponse(res));

export const authorize = (email, password) =>
  fetch(endpointAuth, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));