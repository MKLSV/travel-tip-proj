import { locService } from "./loc.service.js"
import { weatherService } from "./weather.service.js"

export const mapService = {
    initMap,
    addMarker,
    panTo,
    goTo,
    getSearchLoc,
    getLocationName
}


// Var that is used throughout this Module (not global)
var gMap
const API_KEY = 'AIzaSyBBuQbfaEp7dRxXAwVUE-uL5UdxE1um5fs' //TODO: Enter your API Key

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
            // let infoWindow = new google.maps.InfoWindow({
            //     content: "Click the map to get Lat/Lng!",
            //     position: { lat, lng },
            // });
            gMap.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                // infoWindow.close();
                const name = prompt('Name Location')
                weatherService.renderWeather(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng())
                locService.createLocation(name, mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng())
                // Create a new InfoWindow.
                // infoWindow = new google.maps.InfoWindow({
                //     position: mapsMouseEvent.latLng,
                // });
                // infoWindow.setContent(
                //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                // );
                // infoWindow.open(gMap);
            });
            return gMap
        })
}

function addMarker(loc,name) {
    console.log(loc,name)
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: name
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    console.log(API_KEY)
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function goTo(id) {
    const location = locService.findLoc(id)
    console.log(location)
    panTo(location.lat, location.lng)
    weatherService.renderWeather(location.lat, location.lng)
}

function getSearchLoc(val) {
    console.log(val)
    const address = val
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const coordinates = data.results[0].geometry.location
            panTo(coordinates.lat, coordinates.lng)
            locService.createLocation(val, coordinates.lat, coordinates.lng)
        })

}

function getLocationName(lat, lng) {
    // return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&${API_KEY}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         const address = data.results[0]
    //         console.log(address)

    //     })
    return 'here'
}

