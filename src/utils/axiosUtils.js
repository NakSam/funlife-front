import axios from 'axios';

const axiosUtils = axios.create({
  baseURL: 'http://naksam.169.56.174.130.nip.io',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false
});

export default axiosUtils;