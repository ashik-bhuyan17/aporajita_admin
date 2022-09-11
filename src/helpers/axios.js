import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  xsrfHeaderName: 'X-CSRFTOKEN',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (localStorage.token) {
    console.log(localStorage.token);
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
});

export default axiosInstance;
