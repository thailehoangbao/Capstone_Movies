import Axios from "axios"
import { DOMAIN, TOKEN } from '../utils/settings/config'

export class baseService {
    //put json về phía backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
        })
    }


    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { 
                TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE0LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTE5MDQwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1MzM4MDAwfQ.k7Kzay9-bYUjN7pTcMrYpgTq5Xe5U6jdvM1OUQ5L_2A',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN))
            } //JWT
        })
    }


    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { 
                TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE0LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTE5MDQwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1MzM4MDAwfQ.k7Kzay9-bYUjN7pTcMrYpgTq5Xe5U6jdvM1OUQ5L_2A',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN))
            } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}