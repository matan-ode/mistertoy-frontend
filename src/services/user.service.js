import { httpService } from "./http.service.js"

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,

    getById,
    getEmptyCredentials
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    console.log(user)
    if (user) return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    const savedUser = httpService.post(BASE_URL + 'signup', user)
    if (savedUser) return _setLoggedinUser(savedUser)
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
        .then(res => res.data)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// function _setLoggedinUser(user) {
//     const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
//     return userToSave
// }

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123', isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', isAdmin: false})
// })()
