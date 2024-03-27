import checkResponse from './checkResponse.js';
import {
  ADMIN_CRITERIA,
  USERS,
  ADMIN_USERS,
} from '../constants/constantAPI.js';

export const getUserData = (token) =>
  fetch(`${USERS}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const updateAdminData = (id, token, data) =>
  fetch(`${ADMIN_USERS}/${id}`, {
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

export const addNewEmployee = ({
  token,
  fullName,
  position,
  email,
  password,
}) =>
  fetch(ADMIN_USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, position, email, password }),
  }).then((res) => checkResponse(res));

export const getAllCriterion = (token) =>
  fetch(ADMIN_CRITERIA, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const addCriterion = (token, criterionName) =>
  fetch(ADMIN_CRITERIA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: criterionName,
    }),
  }).then((res) => checkResponse(res));

export const updateEmployeeData = ({
  id,
  token,
  fullName,
  position,
  email,
  password,
}) => {
  const requestBody = {
    fullName,
    position,
    email,
  };

  if (password) {
    requestBody.password = password;
  }

  return fetch(`${ADMIN_USERS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  }).then((res) => checkResponse(res));
};
