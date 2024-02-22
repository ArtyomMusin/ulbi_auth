import './style.css'
import Header from './components/Header'
import {useAuth} from './context/AuthContext'
import {observer} from 'mobx-react-lite'
import {useState} from 'react'
import {IUser} from './models/IUser'
import UserStore from './store/UserStore'
import {useUser} from "./context/UserContext";

function App() {
    const auth = useAuth()
    const user = useUser()

    return (
        <div className="App">
            <Header />
            <div className="content">
                {auth.store.isLoading ?
                    'Loading...' :
                (auth.store.isAuth) ? (
                    <>
                        <h1>User {auth.store.user.email}</h1>
                        <button className="button" onClick={() => user.store?.fetchAllUsers()}>Get users</button>
                        {user.store?.allusers?.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>email</th>
                                        <th>isActive</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.store.allusers.map(user =>
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.email}</td>
                                            <td>{String(user.isActivated)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : ('')}
                    </>
                ) : (
                    <h1>User is not authorized</h1>
                )}
            </div>
        </div>
    )
}

export default observer(App)
