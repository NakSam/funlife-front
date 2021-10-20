import axios from 'axios';

const axiosUtils = axios.create({
  baseURL: 'https://naksam.169.56.174.130.nip.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosUtils;