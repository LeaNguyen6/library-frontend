import axios from 'axios'
import authHeader from './services/auth-header';
//const URL = 'http://localhost:8888'
const URL = 'https://api-library-jwt.glitch.me'

export default function apiCaller(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${URL}/${endpoint}`,
        data: body,
        headers: authHeader()
    })
}
