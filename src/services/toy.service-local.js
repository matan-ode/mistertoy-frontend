
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            // if (!filterBy.txt) filterBy.txt = ''
            // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            // if (!filterBy.labels) filterBy.labels = []
            // // if (filterBy.isInStock !== 'outOfStock' && filterBy.isInStock !== 'inStock') filterBy.isInStock = 'all'
            // const regExp = new RegExp(filterBy.txt, 'i')
            // return toys.filter(toy =>
            //     regExp.test(toy.name) &&
            //     toy.price <= filterBy.maxPrice &&
            //     filterBy.labels.some(filterLabel => toy.labels.includes(filterLabel))
            //     // && filterBy.isInStock !== 'all'? filterBy.isInStock === toy.isInStock :filterBy.isInStock === toy.isInStock
            //     && filterBy.isInStock? filterBy.isInStock === toy.isInStock : ''
            // )
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            if (filterBy.labels) {
                toys = toys.filter(toy => toy.labels.includes(filterBy.labels))
            }
            if (filterBy.isInStock !== 'all') {
                toys = toys.filter(toy => toy.isInStock === filterBy.isInStock)
            }
            if (filterBy.sortBy) {
                if(filterBy.sortBy === 'name') toys = toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
                if(filterBy.sortBy === 'price') toys = toys.sort((t1, t2) => t1.price - t2.price)
                if(filterBy.sortBy === 'createdAt') toys = toys.sort((t1, t2) => t1.createdAt - t2.createdAt)
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        isInStock: 'all',
        labels: [],
    }
}

function getRandomToy() {
    const labelsList = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    return {
        name: 'Ball-' + (utilService.getRandomIntInclusive(100, 900)),
        price: utilService.getRandomIntInclusive(100, 900),
        isInStock: (utilService.getRandomIntInclusive(0, 9) % 2 === 1) ? 'inStock' : 'outOfStock',
        labels: [labelsList[utilService.getRandomIntInclusive(0, labelsList.length - 1)], labelsList[utilService.getRandomIntInclusive(0, labelsList.length - 1)]],
        createdAt: Date.now() - utilService.getRandomIntInclusive(100000, 999999999)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', isInStock: 'all', labels: '', sortBy: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            const newToy = getRandomToy()
            newToy._id = utilService.makeId()
            toys.push(newToy)
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}