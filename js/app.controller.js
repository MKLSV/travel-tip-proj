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
window.onGoTo = onGoTo
window.onDelete = onDelete
window.onSearch = onSearch
window.onRefresh = onRefresh

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
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 },'here')
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
            const place = mapService.getLocationName(pos.coords.latitude, pos.coords.longitude)
            console.log(place)
            document.querySelector('.user-pos').innerText = place
                mapService.panTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function renderLocations() {
    const KEY = locService.getKEY()
    const locations = utilService.loadFromStorage(KEY)
    const strHTML = locations.map(loc => `<div  class="location" ><a class="name">${loc.name}</a><div class="btns"> <button id=${loc.id} onclick="onGoTo(this)">Go To</button> <button id=${loc.id}  onclick="onDelete(this)">X</button> </div></div>`)
    document.querySelector('.locs').innerHTML = strHTML.join('')
}

function onGoTo(el) {
    const id = el.getAttribute('id')
    console.log(id)
    mapService.goTo(id)
}

function onDelete(el) {
    const id = el.getAttribute('id')
    console.log(id)
    locService.deleteLoc(id)
}

function onSearch(ev) {
    ev.preventDefault()
    const input = ev.target.elements.search
    const value = input.value
    mapService.getSearchLoc(value)
}

function onRefresh(){
    window.location = "index.html"
}