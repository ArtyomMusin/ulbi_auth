import {createContext, useContext, useEffect} from 'react'
import Store from "../store/store"

interface IAuth {
    store: Store
}

const authContext = createContext<IAuth>({} as IAuth)

export const useAuth = () => {
    return useContext(authContext)
}

// @ts-ignore
export const AuthProvider = ({ children }) => {
    const store = new Store()

    useEffect(() => {
        store.checkAuth()
    }, [])

    return (
        <authContext.Provider value={{ store }}>
            { children }
        </authContext.Provider>
    )
}