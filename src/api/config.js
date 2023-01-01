import axios from 'axios';

export const baseUrl = 'http://localhost:4000/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error, '网络错误');
  }
);

export { axiosInstance };
