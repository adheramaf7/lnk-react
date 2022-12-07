import axios from 'axios';

const apiCLient = () => {
  let { token } = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : {};

  const apiCLient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      accept: 'application/json',
    },
  });

  return apiCLient;
};

export default apiCLient;
