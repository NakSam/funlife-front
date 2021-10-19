import axios from 'axios';

const axiosUtils = axios.create({
  baseURL: 'http://169.56.174.139',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosUtils;