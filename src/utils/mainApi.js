import checkResponse from './checkResponse.js';
import { ADMIN_CRITERIA, USERS, ADMIN_USERS } from '../constants/constantAPI.js';

const { token } = JSON.parse(localStorage.getItem('token'));

const makeAuthenticatedRequest = (url, method, token, body) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  return fetch(url, options).then((res) => checkResponse(res));
};

export const getUserData = (token) =>
  makeAuthenticatedRequest(`${USERS}/me`, 'GET', token);

export const updateAdminData = (id, token, data) =>
  makeAuthenticatedRequest(`${ADMIN_USERS}/${id}`, 'PATCH', token, {
    fullName: data.fullName,
    position: data.position,
    email: data.email,
    password: data.password,
  });

export const getAllUsers = (token) =>
  makeAuthenticatedRequest(ADMIN_USERS, 'GET', token);

export const addNewUser = ({ fullName, position, email, password }) =>
  makeAuthenticatedRequest(ADMIN_USERS, 'POST', token, { fullName, position, email, password });

export const getAllCriterion = (token) =>
  makeAuthenticatedRequest(ADMIN_CRITERIA, 'GET', token);

export const addCriterion = (token, criterionName) =>
  makeAuthenticatedRequest(ADMIN_CRITERIA, 'POST', token, { name: criterionName });

export const updateUserData = ({ id, fullName, position, email, password }) => {
  const requestBody = { fullName, position, email };
  if (password) requestBody.password = password;
  return makeAuthenticatedRequest(`${ADMIN_USERS}/${id}`, 'PATCH', token, requestBody);
};

export const deleteUser = (id) =>
  makeAuthenticatedRequest(`${ADMIN_USERS}/${id}`, 'DELETE', token);
