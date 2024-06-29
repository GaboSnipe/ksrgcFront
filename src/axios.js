import axios from "axios";

const instance = axios.create({
  baseURL: 'https://mysite-uoqd.onrender.com',
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
        
        const response = await axios.post('https://mysite-uoqd.onrender.com/api/accounts/auth/jwt/refresh', { refresh });
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

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default instance;
