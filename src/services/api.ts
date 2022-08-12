import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://task-at-hand-des-web.herokuapp.com',
});
