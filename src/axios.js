import axios from "axios";

// Создаем экземпляр axios
const instance = axios.create({
  baseURL: 'http://localhost:8000',
});
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
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
          const response = await axios.post('http://localhost:8000/auth/jwt/refresh-token/', { refresh });
          const { access } = response.data;
          localStorage.setItem('token', access);
          originalRequest.headers.Authorization = `JWT ${access}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Error:', refreshError);
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
      window.location.href = '/';
      return Promise.reject(error);
    }
  );

export default instance;
