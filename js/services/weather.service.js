export const weatherService = {
    renderWeather
}
const API_KEY = '3ca32407510990c0d121242e7a09eca3'

function renderWeather(lat,lng) {
   console.log(lat,lng)
    fetch(` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.querySelector('.weather').innerHTML = data.weather[0].main
            document.querySelector('.temp').innerHTML = 'Temp: ' + data.main.temp + ' F'
            // document.querySelector('.temp-max').innerHTML = 'Max Temp: ' + data.main.temp_max
            // document.querySelector('.temp-min').innerHTML = 'Min Temp: ' + data.main.temp_min
        })
}