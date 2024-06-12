import axios from 'axios';

const apiServer2 = axios.create({
    baseURL: process.env.REACT_APP_PYTHON_PROXY,
});

export default apiServer2;
