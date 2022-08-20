import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-demo-1f842.firebaseio.com/'
});

export default instance;