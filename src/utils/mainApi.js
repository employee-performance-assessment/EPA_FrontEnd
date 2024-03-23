import checkResponse from './checkResponse.js';
import { endpointUpdateUserData, endpointUserData, endpointGetAllUsers, endpointAddNewEmployee } from '../constants/constantAPI.js';

// проверка токена
export const getUserData = (token) =>
  fetch(endpointUserData, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const updateUserData = (id, token, data) =>
  fetch(`${endpointUpdateUserData}${id}`, {
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
    })
  }).then((res) => checkResponse(res));

export const getAllUsers = (token) =>
  fetch(endpointGetAllUsers, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const addNewEmployee = ({ name, jobTitle, email, password, confirmPassword }) =>
  fetch(endpointAddNewEmployee, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, jobTitle, email, password, confirmPassword }),
  }).then((res) => checkResponse(res));
