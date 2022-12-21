import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/util.service.js'

export const appController = {
    renderLocations
}


window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.goTo = goTo
window.onDelete = onDelete

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

        renderLocations()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function renderLocations(){
    const KEY = locService.getKEY()
    const locations = utilService.loadFromStorage(KEY)
    const strHTML = locations.map(loc => `<div  class="location" ><a class="name">${loc.name}</a><div class="btns"> <button id=${loc.id} onclick="goTo(this)">Go To</button> <button id=${loc.id}  onclick="onDelete(this)">X</button> </div></div>`)
    document.querySelector('.locs').innerHTML = strHTML.join('')
}

function goTo(el) {
    console.log(el)
    const id = el.getAttribute('id')
    console.log(id)
}

function onDelete(el){
    const id = el.getAttribute('id')
    console.log(id)
    locService.deleteLoc(id)
}