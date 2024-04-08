import checkResponse from './checkResponse.js';
import {
  ADMIN_RESET_TO_DEFAULT_QUESTIONNAIRE,
  ADMIN_QUESTIONNAIRE_PASSED,
  EVALUATIONS_LIST_ASSESSED,
  ADMIN_QUESTIONNAIRE_LAST,
  EVALUATIONS_LIST_ASSESS,
  ADMIN_CRITERIA_DEFAULT,
  USER_QUESTIONNAIRE,
  ADMIN_EVALUATIONS,
  ADMIN_PROJECTS,
  ADMIN_CRITERIA,
  ADMIN_ASSESSED,
  EVALUATIONS,
  ADMIN_USERS,
  ADMIN_TASK,
  PROJECTS,
  USERS,
  USER_TASK,
  ADMIN_USER_QUESTIONNAIRE_LIST,
  ADMIN_RATING,
  ADMIN_STAT_POINTS,
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

export const getUserData = () => request(`${USERS}/me`, 'GET');

export const updateAdminData = (id, data) =>
  request(`${ADMIN_USERS}/${id}`, 'PATCH', {
    fullName: data.fullName,
    position: data.position,
    email: data.email,
    password: data.password,
  });

export const getAllUsers = () => request(ADMIN_USERS, 'GET');

export const getCurrentUser = (id) => request(`${USERS}/${id}`, 'GET');

export const addNewUser = ({ fullName, position, email, password }) =>
  request(ADMIN_USERS, 'POST', {
    fullName,
    position,
    email,
    password,
  });

export const getAllCriterion = () => request(ADMIN_CRITERIA, 'GET');

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

export const getDefaultCriterion = () => request(ADMIN_CRITERIA_DEFAULT, 'GET');

export const updateUserData = ({ id, fullName, position, email, password }) => {
  const requestBody = { fullName, position, email };
  if (password) requestBody.password = password;
  return request(`${ADMIN_USERS}/${id}`, 'PATCH', requestBody);
};

export const deleteUser = (id) => request(`${ADMIN_USERS}/${id}`, 'DELETE');

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
  request(`${ADMIN_TASK}/find?employeeId=${employeeId}&status=${status}`, 'GET');

export const getTaskDetailsByAdmin = (taskId) =>
  request(`${ADMIN_TASK}/${taskId}`, 'GET');

export const deleteTaskByAdmin = (taskId) =>
  request(`${ADMIN_TASK}/${taskId}`, 'DELETE');

export const updateTaskByAdmin = (task) => {
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

// USER TASKS
export const getTasksWithStatusByUser = (status) => request(`${USER_TASK}?status=${status}`, 'GET');
export const getTaskDetailsByUser = (taskId) => request(`${USER_TASK}/${taskId}`, 'GET');

export const getColleaguesEvaluation = () => request(EVALUATIONS, 'GET');

export const getListNewQuestionnaires = () =>
  request(EVALUATIONS_LIST_ASSESS, 'GET');

export const getListComplitedQuestionnaires = () =>
  request(EVALUATIONS_LIST_ASSESSED, 'GET');

export const postEvaluationsList = (data) => {
  const { questionnaireId, evaluatedId, questionnaireData } = data;
  return request(
    `${ADMIN_EVALUATIONS}?questionnaireId=${questionnaireId}&evaluatedId=${evaluatedId}`,
    'POST',
    questionnaireData
  );
};

export const getEvaluationsList = (questionnaireId, evaluatedId) =>
  request(
    `${ADMIN_ASSESSED}?questionnaireId=${questionnaireId}&evaluatedId=${evaluatedId}`,
    'GET'
  );

export const getEvaluations = (evaluatedId, questionnaireId) =>
  request(
    `${ADMIN_EVALUATIONS}?evaluatedId=${evaluatedId}&questionnaireId=${questionnaireId}`,
    'GET'
  );

export const getQuestionnaireList = (evaluatedId) =>
  request(`${ADMIN_USER_QUESTIONNAIRE_LIST}?evaluatedId=${evaluatedId}`, 'GET');

export const getRating = (employeeId) =>
  request(`${ADMIN_RATING}/${employeeId}`, 'GET');

export const getStatPoints = (employeeId) =>
  request(`${ADMIN_STAT_POINTS}/${employeeId}`, 'GET');
