import axios from 'axios';

let AxiosConfig = axios.create({
  baseURL: 'http://localhost:5234/api'
});

export default AxiosConfig;