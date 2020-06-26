import axios from 'axios'
import authHeader from './services/auth-header';
const URL = 'http://localhost:8888'

export default function apiCaller(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${URL}/${endpoint}`,
        data: body,
        headers: authHeader()
    })
}
