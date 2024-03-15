import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import checkResponse from './checkResponse.js';
import { BASE_URL } from '../constants/constantAPI.js';

// получаем токен из ЛС
export const getAuthToken = () => localStorage.getItem('token');

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: '/public/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/public/auth',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => {
        const token = getAuthToken();
        const authHeader = token ? { Authorization: `Token ${token}` } : {};

        return {
          url: '#',
          method: 'POST',
          headers: authHeader,
        };
      },
    }),
  }),
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();

      if (token) {
        headers.set('authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    // Определение запросa для получения данных авторизованного пользователя
    getMe: build.query({
      query: () => '#',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
export const { useRegisterMutation } = registerApi;
export const { useGetMeQuery } = userApi;

//
//
//
//
//
//
//
//
//
// проверка токена
export const chekTokenUser = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));

export const register = (name, email, password) =>
  fetch(`${BASE_URL}/public/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));

export const authorize = (email, password) =>
  fetch(`${BASE_URL}/public/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
