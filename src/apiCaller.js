import React from 'react'
import axios from 'axios'
const URL = 'https://27--rest-api.glitch.me'

export default function apiCaller(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${URL}/${endpoint}`,
        data: body
    })
}
