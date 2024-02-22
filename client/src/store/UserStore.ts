import {IUser} from '../models/IUser'
import {makeAutoObservable} from 'mobx'
import UserService from "../service/UserService";
import {AxiosResponse} from "axios";

export default class UserStore {
    allusers = [] as IUser[]
    requestedUser = {} as IUser
    isLoadingAll = true
    isLoadingRequestedUser = true

    constructor() {
        makeAutoObservable(this)
    }

    setAllUsers (data: IUser[]) {
        this.allusers = data
    }

    setRequestedUser (data: IUser) {
        this.requestedUser = data
    }

    setIsLoadingAll (data: boolean) {
        this.isLoadingAll = data
    }

    setIsLoadingRequestedUser (data: boolean) {
        this.isLoadingRequestedUser = data
    }

    async fetchAllUsers () {
        try {
            this.setIsLoadingAll(true)
            const response = await UserService.fetchUsers()
            this.setAllUsers(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setIsLoadingAll(false)
        }
    }

    async fetchUserById (id: string) {
        try {
            this.setIsLoadingRequestedUser(true)
            const response: AxiosResponse<IUser> = await UserService.fetchUsersById(id)
            this.setRequestedUser(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setIsLoadingRequestedUser(false)
        }
    }
}