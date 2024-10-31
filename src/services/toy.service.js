
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getLabelsList
}


function query(filterBy = {}) {
    // return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    // return axios.get(BASE_URL + toyId).then(res => res.data)
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    // return axios.delete(BASE_URL + toyId).then(res => res.data) // api/toy/c102/remove
    return httpService.delete(BASE_URL + toyId)

}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}
function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: '',
        labels: [],
    }
}

function getLabelsList() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}

function getRandomToy() {
    const labelsList = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    return {
        name: 'Ball-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        inStock: (utilService.getRandomIntInclusive(0, 9) % 2 === 1) ? true : false,
        labels: [labelsList[utilService.getRandomIntInclusive(0, labelsList.length - 1)], labelsList[utilService.getRandomIntInclusive(0, labelsList.length - 1)]],
        createdAt: Date.now() - utilService.getRandomIntInclusive(100000, 999999999)
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: 'all', labels: '', sortBy: '' }
}
