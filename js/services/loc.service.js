import { utilService } from "./util.service.js"

export const locService = {
    getLocs,
    createLocation
}
const LOC_KEY = 'locDB'

const locs = [
    { id: 'as3a1', name: 'Greatplace', lat: 32.047104, lng: 34.832384, time: Date.now() },
    { id: 'as5a1', name: 'Neveragain', lat: 32.047201, lng: 34.832581, time: Date.now() }
]

function createLocation(lat, len) {
    const name = utilService.randomLocName()
    const id = utilService.makeId()
    const time = Date.now()
    const place = { id, name, lat, len, time }
    addPlace(place)
}

function addPlace(place) {
    locs.unshift(place)
    utilService.saveToStorage(LOC_KEY,locs)
    console.log(locs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

