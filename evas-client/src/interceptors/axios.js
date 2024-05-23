import axios from 'axios';
import AuthService from '../services/authServices';

const instance = axios.create({
    baseURL: AuthService.API_URL, // `url`이 절대값이 아닌 경우 `baseURL`은 URL 앞에 붙음.
    // 상대적인 URL을 인스턴스 메서드에 전달하려면 `baseURL`을 설정하는 것은 편리
});

// 요청을 보내기 전에 intercept 해서 헤더에 accessToken을 추가
instance.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

// 응답을 받기 전에 intercept 해서 accessToken이 만료되었을 경우 refreshToken을 통해 새로운 accessToken을 발급
instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {    
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await AuthService.refreshToken();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
            return instance(originalRequest);
        }
        return Promise.reject(error);
    });

export {instance};