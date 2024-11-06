// import './assets/style/main.css'
import './assets/style/main.scss'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HomePage } from './pages/HomePage'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { ToyIndex } from './pages/ToyIndex'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import { AboutUs } from './pages/AboutUs'
import { AppFooter } from './cmps/AppFooter'
import { Dashboard } from './pages/Dashboard'
import { UserDetails } from './pages/UserDetails'


function App() {


    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}

export default App
