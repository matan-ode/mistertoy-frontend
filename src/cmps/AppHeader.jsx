import { UserMsg } from './UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { yellow } from '@mui/material/colors'

import logoUrl from '../../src/assets/img/logo.png'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const dispatch = useDispatch()

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }


    return (

        <header className="app-header full main-layout">
            <section className="header-container">
                <div className="flex align-center">
                    {/* <img src="logoUrl" style={{ width: '3em', height: '100%', marginInlineEnd: '1em' }} /> */}
                    <img src="/logo.png" style={{ width: '3em', height: '100%', marginInlineEnd: '1em' }} />
                    <h1 style={{ fontFamily: 'poppins', fontSize: '2em' }}>Mister Toy</h1>
                </div>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>

    )
}
