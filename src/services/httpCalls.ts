import { User } from '../models/User';
import { api } from './api';

type Credentials = {
  email: string;
  password: string;
};

export const login = async (url: string, user: Credentials) => {
  const res = await api.post(url, user);
  return res;
};

export const signup = async (url: string, user: User) => {
  const res = await api.post(url, user);
  return res;
};

export const saveTodo = async (url: string, user: User) => {
  const res = await api.put(url, user);
  return res;
};
