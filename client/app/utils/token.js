import axios from 'axios';

const setToken = (token) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
  } else {
    axios.defaults.headers.common['Authorization'] = token;
  }
};

export default setToken;
