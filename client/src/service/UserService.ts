import http from '../http'
import {AxiosResponse} from 'axios'
import {IUser} from '../models/IUser'

export default class UserService {
    static fetchUsers (): Promise<AxiosResponse<IUser[]>> {
        return http.get('/users/allusers')
    }

    static fetchUsersById (id: string): Promise<AxiosResponse<IUser>> {
        return http.get(`/users/allusers/${id}` )
    }
}
