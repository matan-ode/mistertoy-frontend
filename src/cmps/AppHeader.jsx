import { UserMsg } from './UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { yellow } from '@mui/material/colors'

import logoUrl from '../../src/assets/img/logo.png'
import { useEffect, useState } from 'react'
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions.js'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const navigate = useNavigate()
    const [isLoggedinUser, setLoggedinUser] = useState(false)

    useEffect(() => {
        getNav()
    }, [isLoggedinUser])

    const dispatch = useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
        setLoggedinUser(false)
    }

    function getNav() {
        return (<nav className={`app-nav ${showMenu}`}>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/about" >About</NavLink>
            <NavLink to="/toy" >Toys</NavLink>
            <NavLink to="/dashboard" >Dashboard</NavLink>
            <NavLink to="/explore" >Explore</NavLink>

            {isLoggedinUser ? <NavLink to={`/user/${user ? user._id : ''}`}>Profile</NavLink>
                : ''}

        </nav>)
    }



    function onBurger() {
        setIsMenuOpen(burger => !burger)
    }
    console.log(user);


    const showMenu = (isMenuOpen) ? 'show-menu' : ''
    return (

        <header className="app-header full main-layout">
            <section className="header-container">
                <div className="flex align-center">
                    {/* <img src="logoUrl" style={{ width: '3em', height: '100%', marginInlineEnd: '1em' }} /> */}
                    <img src="/logo.png" style={{ width: '3em', height: '100%', marginInlineEnd: '1em' }} />
                    <h1 style={{ fontFamily: 'poppins, sans-serif', fontSize: '2em' }}>Mister Toy</h1>
                </div>
                <div onClick={onBurger} className='burger'><img src="/menu-icon.png" alt="menu" style={{ width: '3em' }} /></div>
                {getNav()}
                {isLoggedinUser && (
                    <section className="user-info">
                        {/* <p>
                            {user.fullname} <span>${user.score.toLocaleString()}</span>
                        </p> */}
                        <button onClick={onLogout}>Logout</button>
                    </section>
                )}
                {!isLoggedinUser && (
                    <section className="user-info">
                        <LoginSignup setLoggedinUser={setLoggedinUser} />
                    </section>
                )}
            </section>
            <UserMsg />
        </header>

    )
}
