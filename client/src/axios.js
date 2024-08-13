import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://takeuforward-assignment-8kd8.onrender.com/api/v1', // Adjust to your backend URL
});

export default instance;
