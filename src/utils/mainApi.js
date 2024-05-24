import checkResponse from './checkResponse.js';
import {
  ADMIN_RESET_TO_DEFAULT_QUESTIONNAIRE,
  ADMIN_USER_QUESTIONNAIRE_LIST,
  ADMIN_QUESTIONNAIRE_PASSED,
  EVALUATIONS_LIST_ASSESSED,
  DATA_INDIVIDUAL_DEADLINES,
  ADMIN_QUESTIONNAIRE_LAST,
  USER_QUESTIONNAIRE_LIST,
  EVALUATIONS_LIST_ASSESS,
  LIST_OF_MONTHS_PERSONAL,
  ADMIN_CRITERIA_DEFAULT,
  LIST_OF_MONTHS_COMMAND,
  LIST_MONTHS_DEADLINE,
  LIST_OF_MONTH_USERS,
  LIST_YEARS_DEADLINE,
  DATA_TEAM_DEADLINES,
  USER_QUESTIONNAIRE,
  LIST_YEARS_RATINGS,
  ADMIN_EVALUATIONS,
  ADMIN_STAT_POINTS,
  USER_EMPLOYEE_ME,
  USER_STAT_POINTS,
  ADMIN_PROJECTS,
  ADMIN_CRITERIA,
  ADMIN_RATING,
  EMPLOYEE_ME,
  EVALUATIONS,
  ADMIN_USERS,
  USER_RATING,
  ADMIN_TASK,
  USER_TASK,
  PROJECTS,
  USERS,
} from '../constants/constantAPI.js';

function getToken() {
  return JSON.parse(localStorage.getItem('token')).token;
}

const request = (url, method, body) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  return fetch(url, options).then((res) => checkResponse(res));
};

// USER DATA
export const getUserData = () => request(`${USERS}/me`, 'GET');

export const updateAdminData = (id, data) =>
  request(`${ADMIN_USERS}/${id}`, 'PATCH', {
    fullName: data.fullName,
    position: data.position,
    email: data.email,
    password: data.password,
  });

export const getInfoOwnerJWT = () => request(EMPLOYEE_ME, 'GET');

// ADMIN USERS
export const getAllUsers = () => request(ADMIN_USERS, 'GET');

export const addNewUser = ({ fullName, position, email, password }) =>
  request(ADMIN_USERS, 'POST', {
    fullName,
    position,
    email,
    password,
  });

export const updateUserData = ({ id, fullName, position, email, password }) => {
  const requestBody = { fullName, position, email };
  if (password) requestBody.password = password;
  return request(`${ADMIN_USERS}/${id}`, 'PATCH', requestBody);
};

export const deleteUser = (id) => request(`${ADMIN_USERS}/${id}`, 'DELETE');

export const getCurrentUser = (id) => request(`${USERS}/${id}`, 'GET');

export const getAllCriterion = () => request(ADMIN_CRITERIA, 'GET');

// ADMIN PROJECTS
export const getProjectsName = () => request(PROJECTS, 'GET');

export const setProjectsNewName = (nameProject, id) => {
  const requestBody = { name: nameProject };
  return request(`${ADMIN_PROJECTS}/${id}`, 'PATCH', requestBody);
};

export const setNewProjects = (nameProject) => {
  const requestBody = { name: nameProject };
  return request(ADMIN_PROJECTS, 'POST', requestBody);
};

export const deleteProject = (id) =>
  request(`${ADMIN_PROJECTS}/${id}`, 'DELETE');

// ADMIN TASKS
export const getUserTasksWithStatusByAdmin = (employeeId, status) =>
  request(
    `${ADMIN_TASK}/find?employeeId=${employeeId}&status=${status}`,
    'GET'
  );

  export const getUserTasksWithSearchByAdmin = (employeeId, searchQuery) =>
  request(
    `${ADMIN_TASK}/find?employeeId=${employeeId}&text=${searchQuery}`,
    'GET'
  );

  export const getUserTasksWithSearchAndStatusByAdmin = (employeeId, status, searchQuery) =>
  request(
    `${ADMIN_TASK}/find?employeeId=${employeeId}&status=${status}&text=${searchQuery}`,
    'GET'
  );

export const getTaskDetailsByAdmin = (taskId) =>
  request(`${ADMIN_TASK}/${taskId}`, 'GET');

export const deleteTaskByAdmin = (taskId) =>
  request(`${ADMIN_TASK}/${taskId}`, 'DELETE');

export const updateTaskStatusByAdmin = (task) => {
  const requestBody = {
    name: task.name,
    description: task.description,
    projectId: task.project.id,
    executorId: task.executor.id,
    deadLine: task.deadLine,
    status: task.status,
    basicPoints: task.basicPoints,
    penaltyPoints: task.penaltyPoints,
  };
  request(`${ADMIN_TASK}/${task.id}`, 'PATCH', requestBody);
};

export const setNewTask = (requestBody) =>
  request(ADMIN_TASK, 'POST', requestBody);

export const getAdminTask = () => request(ADMIN_TASK, 'GET');

export const patchAdminTask = (taskId, requestBody) =>
  request(`${ADMIN_TASK}/${taskId}`, 'PATCH', requestBody);

// USER TASKS
export const getTasksWithStatusByUser = (status) =>
  request(`${USER_TASK}?status=${status}`, 'GET');

export const getTaskDetailsByUser = (taskId) =>
  request(`${USER_TASK}/${taskId}`, 'GET');

export const updateTaskStatusByUser = (taskId, status) =>
  request(`${USER_TASK}/${taskId}?status=${status}`, 'PATCH');

export const getUserTask = () => request(USER_EMPLOYEE_ME, 'GET');

export const getTasksWithSearchByUser = (searchQuery) =>
  request(
    `${USER_TASK}?text=${searchQuery}`,
    'GET'
  );

export const getTasksWithSearchAndStatusByUser = (status, searchQuery) =>
  request(
    `${USER_TASK}?status=${status}&text=${searchQuery}`,
    'GET'
  );

// ADMIN QUESTIONNAIRE
export const getQuestionnaireLast = () =>
  request(ADMIN_QUESTIONNAIRE_LAST, 'GET');

export const getQuestionnaire = (questionnaireId) =>
  request(`${USER_QUESTIONNAIRE}/${questionnaireId}`, 'GET');

export const updateQuestionnaireLast = (questionnaire) =>
  request(ADMIN_QUESTIONNAIRE_LAST, 'PATCH', questionnaire);

export const resetToDefaultQuestionnaire = () =>
  request(ADMIN_RESET_TO_DEFAULT_QUESTIONNAIRE, 'PATCH');

export const checkActivitySurveyButton = () =>
  request(ADMIN_QUESTIONNAIRE_PASSED, 'GET');

export const doQuestionnaireSurvey = () =>
  request(ADMIN_QUESTIONNAIRE_LAST, 'PUT');

// ADMIN CRITERIA
export const getDefaultCriterion = () => request(ADMIN_CRITERIA_DEFAULT, 'GET');

// EVALUATION & RATING
// Получение подробных результатов анкеты админом и сотрудником
export const getEvaluationsByAdmin = (evaluatedId, questionnaireId) =>
  request(
    `${ADMIN_EVALUATIONS}?evaluatedId=${evaluatedId}&questionnaireId=${questionnaireId}`,
    'GET'
  );

export const getAdminEvaluation = () => request(ADMIN_EVALUATIONS, 'GET');

export const getEvaluationsByUser = (questionnaireId) =>
  request(`${EVALUATIONS}?questionnaireId=${questionnaireId}`, 'GET');

// Получение списка заполненных анкет по конкретному сотруднику админом и сотрудником
export const getQuestionnaireListByAdmin = (evaluatedId) =>
  request(`${ADMIN_USER_QUESTIONNAIRE_LIST}?evaluatedId=${evaluatedId}`, 'GET');

export const getQuestionnaireListByUser = () =>
  request(USER_QUESTIONNAIRE_LIST, 'GET');

// Получение рейтинга за месяц по конкретному сотруднику админом и сотрудником
export const getRatingByAdmin = (employeeId) =>
  request(`${ADMIN_RATING}/${employeeId}`, 'GET');

export const getRatingByUser = () => request(USER_RATING, 'GET');

export const getColleaguesEvaluation = () => request(EVALUATIONS, 'GET');

export const getListNewQuestionnaires = () =>
  request(EVALUATIONS_LIST_ASSESS, 'GET');

export const getListComplitedQuestionnaires = () =>
  request(EVALUATIONS_LIST_ASSESSED, 'GET');

export const postEvaluationsList = (path, questionnaireId, employeeId, data) =>
  request(
    `${path}?questionnaireId=${questionnaireId}&evaluatedId=${employeeId}`,
    'POST',
    data
  );

export const getEvaluationsList = (path, questionnaireId, evaluatedId) =>
  request(
    `${path}?questionnaireId=${questionnaireId}&evaluatedId=${evaluatedId}`,
    'GET'
  );

// STATISTICS
// Получение баллов за выполненные задачи в текущем месяце по конкретному сотруднику админом и сотрудником
export const getStatPointsByAdmin = (employeeId) =>
  request(`${ADMIN_STAT_POINTS}/${employeeId}`, 'GET');

export const getStatPointsByUser = () => request(USER_STAT_POINTS, 'GET');

// ANALYTICS Ratings
export const getListYearsRatings = () => request(LIST_YEARS_RATINGS, 'GET');
export const getListMonthsCommand = (year) => request(`${LIST_OF_MONTHS_COMMAND}?year=${year}`, 'GET');
export const getListMonthsPersonal = (year) => request(`${LIST_OF_MONTHS_PERSONAL}?year=${year}`, 'GET');
export const getListMonthUser = (evaluatedId, year) =>
  request(`${LIST_OF_MONTH_USERS}?evaluatedId=${evaluatedId}&year=${year}`, 'GET');

// ANALYTICS Deadline
export const getListYearsDeadlineAdmin = () => request(LIST_YEARS_DEADLINE, 'GET');
export const getListMonthsDeadlineAdmin = (year) => request(`${LIST_MONTHS_DEADLINE}${year}/months`, 'GET');
export const getDataTeamDeadlinesAdmin = (year, month) => request(`${DATA_TEAM_DEADLINES}?year=${year}&month=${month}`, 'GET');
export const getDataIndividualDeadlinesAdmin = (year, month) => request(`${DATA_INDIVIDUAL_DEADLINES}?year=${year}&month=${month}`, 'GET');
