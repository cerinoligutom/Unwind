import axios from 'axios';
import { localStorageService } from './local-storage.service';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://192.168.100.7:9200/api/v1',
});

const setToken = (token: string) => {
  localStorageService.setItem('token', token);
};

const getToken = (withBearer = true) => {
  const token = localStorageService.getItem<string>('token');
  return withBearer ? `Bearer ${token}` : `${token}`;
};

const get = async <T>(url: string, urlParams?: { [key: string]: any }) => {
  return api
    .get<T>(url, {
      headers: {
        Authorization: getToken(),
      },
      params: urlParams,
    })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
};

const put = async <T>(url: string, data?: { [key: string]: any }) => {
  return api
    .put<T>(url, data, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
};

const post = async <T>(url: string, data?: { [key: string]: any }) => {
  return api
    .post<T>(url, data, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
};

const del = async (url: string) => {
  return api
    .delete(url, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
};

export const apiService = {
  getToken,
  setToken,
  get,
  put,
  post,
  del,
};
