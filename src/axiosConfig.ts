import axios, { AxiosRequestTransformer } from 'axios';
import { getCookie } from './services/authorizationService';

axios.defaults.transformRequest = ((data, headers: Record<string, string>) => {
  const token = getCookie('token');
  (headers.common as unknown as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  return data;
}) as AxiosRequestTransformer;

axios.defaults.baseURL = 'https://project-management-app.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';
