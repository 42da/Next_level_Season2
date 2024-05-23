// src/services/authService.js
import axios from 'axios';

const seoeun = 'http://192.168.144.9:8080'; // 이서은 서버
const gipyeong = 'http://localhost:8080'; // 본인 서버
const API_URL = gipyeong; // 실제 API URL로 변경하세요

// 회원가입
/*
const register = (username, email, password) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
};
*/

const login = (loginId, password) => {
  return axios.post(`${API_URL}/login`, {
    loginId,
    password,
  })
  .then(response => {
    if (response.data.accessToken || response.data.refreshToken) {  // 처음 로그인 하는데 refreshToken 도 필요?
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response;
  });
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const getCurrentUser = () => {  // 로컬 스토리지에서 현재 사용자 정보를 가져와 JSON 형식으로 반환
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return JSON.parse(atob(accessToken.split('.')[1])); // JWT payload 디코딩
  }
  return null;
};

const refreshToken = () => {  // 로컬 스토리지에 저장된 refreshToken을 사용하여 새로운 accessToken을 발급
  return axios.post(`${API_URL}/refresh-token`, {
    token: localStorage.getItem('refreshToken'),
  }).then(response => {
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data.accessToken;
  });
};



export default {
  //register,
  API_URL,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};