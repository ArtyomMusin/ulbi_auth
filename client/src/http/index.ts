import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
export const API_URL = 'http://localhost:5500/api'
export const AUTH_URL = `${API_URL}/auth`

const http = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

http.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer=${localStorage.getItem('token')}`
    return config
})

http.interceptors.response.use((config) => {
    return config
}, async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !error.config._isRetry) {
            try {
                originalRequest._isRetry = true
                const response = await axios.get<AuthResponse>(`${AUTH_URL}/refresh`, {withCredentials: true})
                localStorage.setItem('token', response.data.accessToken)
                return http.request(originalRequest)
            } catch (e) {
                console.log('Unauthorized')
            }
        }
        throw error
    }
)

export default http
