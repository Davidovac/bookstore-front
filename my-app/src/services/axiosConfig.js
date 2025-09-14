import axios from 'axios';

let AxiosConfig = axios.create({
  baseURL: 'http://localhost:5111/api'
});

export default AxiosConfig;