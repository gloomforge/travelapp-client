import axios from 'axios';
import { API_URL } from './BaseUrl';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);

                originalRequest.headers.Authorization = `Bearer ${data.token}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.dispatchEvent(new Event('storage'));
                window.location.href = '/account/auth/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 