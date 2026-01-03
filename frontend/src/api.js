import axios from 'axios';

const API = axios.create({
    //baseURL : "https://asset-management-system-hh98.onrender.com/api/",
    baseURL: "http://127.0.0.1:8000/api/",

});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
