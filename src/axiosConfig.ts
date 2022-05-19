import axios, { AxiosRequestTransformer } from 'axios';
import { getCookie } from './services/authorizationService';
import { CommonHeaders } from './services/interfaces';

axios.defaults.transformRequest = ((data, headers: CommonHeaders) => {
  const token = getCookie('token');
  (headers.common as unknown as CommonHeaders)['Authorization'] = `Bearer ${token}`;
  return data;
}) as AxiosRequestTransformer;

axios.defaults.baseURL = 'https://project-management-app.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';
