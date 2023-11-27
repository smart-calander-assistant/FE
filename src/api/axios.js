import axios from 'axios';

const instance = axios.create({
    baseURL:
        'https://planassistant.site:8000',
});

export default instance;