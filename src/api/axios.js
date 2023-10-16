import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-3-39-36-122.ap-northeast-2.compute.amazonaws.com:8080',
});

export default instance;
