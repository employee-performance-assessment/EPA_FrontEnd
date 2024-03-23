const BASE_URL = 'http://158.160.121.57:60606';

export const endpointRegister = `${BASE_URL}/public/register`;
export const endpointAuth = `${BASE_URL}/public/auth`;
/* export const endpointLogout = `${BASE_URL}/public/logout`; */
export const endpointUserData = `${BASE_URL}/user/employee/me`;
export const endpointUpdateUserData = `${BASE_URL}/user/employee/`; // надо переименовать в endpointEmployee, тк 3 роута с таким роутом, к 2м из них добавляем id
export const endpointGetAllUsers = `${BASE_URL}/user/employee`;
export const endpointAddNewEmployee = `${BASE_URL}/admin/employee`;
