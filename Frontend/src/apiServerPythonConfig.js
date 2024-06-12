import axios from 'axios';

const apiServer2 = axios.create({
    baseURL: '127.0.0.1:5000'
});

export default apiServer2;
