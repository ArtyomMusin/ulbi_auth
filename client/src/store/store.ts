import {IUser} from '../models/IUser'
import {makeAutoObservable} from 'mobx'
import AuthService from '../service/AuthService'
import axios, {AxiosError} from 'axios'
import {AuthResponse} from '../models/response/AuthResponse'
import {AUTH_URL} from '../http'

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = true

    constructor() {
        makeAutoObservable(this)
    }

    setAuth (bool: boolean) {
        this.isAuth = bool
    }

    setUser (user: IUser) {
        this.user = user
    }

    setIsLoading (status: boolean) {
        this.isLoading = status
    }

    async login (email: string, password: string) {
        try {
            const response  = await AuthService.login(email, password)
            if (response instanceof AxiosError) {
                return
            }
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async registration (email: string, password: string) {
        try {
            const response  = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout () {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth () {
        this.setIsLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${AUTH_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setIsLoading(false)
        }
    }
}