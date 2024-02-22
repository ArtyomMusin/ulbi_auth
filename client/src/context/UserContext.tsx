import {createContext, useContext} from "react";
import UserStore from "../store/UserStore";

interface IUserContext {
    store: UserStore
}

const userContext = createContext<IUserContext>({} as { store: UserStore })

export const useUser = () => {
    return useContext(userContext)
}

// @ts-ignore
export const UserProvider = ({ children }) => {
    const store = new UserStore()

    return (
        <userContext.Provider value={{ store }}>
            {children}
        </userContext.Provider>
    )
}
