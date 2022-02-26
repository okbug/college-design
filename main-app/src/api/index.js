import axios from 'axios';

const request = axios.create({
    baseURL:'http://localhost:9527',
    timeout: 4000,
})

request.interceptors.response.use((res) => {
    return res.data
})

export default request