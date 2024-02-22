import { useState } from 'react'
import {useAuth} from "../context/AuthContext";

const Header = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const auth = useAuth()

    return (
        <header className='header'>
            <div className="logo">Auth</div>
            {auth.store.isLoading ?
                'Loading...'
            : (!auth.store.isAuth) ? (
                <div className="auth">
                    <form className='login'>
                        <input value={loginData.email} id="login-email" type="text" placeholder="email" onChange={e => setLoginData(prevState => ({ ...prevState, email: e.target.value }))}/>
                        <input value={loginData.password} id="login-password" type="password" placeholder="password" onChange={e => setLoginData(prevState => ({ ...prevState, password: e.target.value }))}/>
                        <button className="button" type="button" onClick={() => auth.store.login(loginData.email, loginData.password)}>enter</button>
                    </form>
                    <div className="register-wrapper">
                        <button className="button" type="button" onClick={() => auth.store.registration(loginData.email, loginData.password)}>registration</button>
                    </div>
                </div>
            ) : (
                <button className="button" type="button" onClick={() => auth.store.logout()}>logout</button>
            )}
        </header>
    )
}

export default Header
