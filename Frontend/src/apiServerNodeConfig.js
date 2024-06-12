import axios from 'axios';

const apiServer1 = axios.create({
    baseURL: process.env.REACT_APP_NODE_PROXY,
});

export default apiServer1;
