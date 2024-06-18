import axios from "axios";

// Создаем экземпляр axios
const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

// Интерсептор для добавления токена в заголовки запросов
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Интерсептор для обработки ответов и обновления токенов при необходимости
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) {
          window.location.href = '/';
          return Promise.reject(error);
        }
        
        const response = await axios.post('http://localhost:8000/api/accounts/auth/jwt/refresh-token/', { refresh });
        const { access } = response.data;
        
        localStorage.setItem('token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    if (error.response && error.response.status === 401) {
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

export default instance;
