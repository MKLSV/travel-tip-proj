import { utilService } from "./util.service.js"
import { appController } from "../app.controller.js"


export const locService = {
    getLocs,
    createLocation,
    getKEY,
    deleteLoc
}
const LOC_KEY = 'locDB'

let locs = utilService.loadFromStorage(LOC_KEY)

if (locs && locs.length) console.log(locs)
else {
    locs = [
        { id: 'as3a1', name: 'Greatplace', lat: 32.047104, lng: 34.832384, time: Date.now() },
        { id: 'as5a1', name: 'Neveragain', lat: 32.047201, lng: 34.832581, time: Date.now() }
    ]
    utilService.saveToStorage(LOC_KEY, locs)
}

function createLocation(lat, lng) {
    const name = utilService.randomLocName()
    const id = utilService.makeId()
    const time = Date.now()
    const place = { id, name, lat, lng, time }
    addPlace(place)
}

function addPlace(place) {
    locs.unshift(place)
    utilService.saveToStorage(LOC_KEY, locs)
    appController.renderLocations()
    console.log(locs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function getKEY() {
    return LOC_KEY
}

function deleteLoc(id) {
    const index = locs.findIndex(loc => loc.id === id)
    locs.splice(index,1)
    utilService.saveToStorage(LOC_KEY, locs)
    appController.renderLocations()
}