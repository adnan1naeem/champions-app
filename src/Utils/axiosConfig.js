import axios from 'axios';
import { API_BASE_URL } from '../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('AUTH_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
