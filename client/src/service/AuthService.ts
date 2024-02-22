import http from '../http'
import {AxiosResponse, AxiosError} from 'axios'
import {AuthResponse} from '../models/response/AuthResponse'

export default class AuthService {
    static async login (email: string, password: string): Promise<AxiosResponse<AuthResponse> | AxiosError<any>> {
        return await http.post('/auth/login', {email, password})
    }

    static async registration (email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return http.post('/auth/registration', {email, password})
    }

    static async logout (): Promise<void> {
        return http.post('/auth/logout')
    }
}
