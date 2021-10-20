import axios from 'axios';

const axiosUtils = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosUtils;