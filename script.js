const Input = document.getElementById('city-input')
const box = document.querySelector('.box')
const container = document.querySelector('.container')

const city = document.getElementById('city')
const weather = document.getElementById('weather')
const feelLike = document.getElementById('feel-like')
const humidity = document.getElementById('humidity')
const getLocation = document.getElementById('getlocation-btn')
const iconBox = document.getElementById('weather-img')
const back = document.getElementById('back')
const errorBox = document.querySelector('error')
const errorText = document.getElementById('error-text')

const checkGeo = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callApiCity, errorGetLocation)
    }else {
        alert('Your browser not support geolocation')
    }
}

function callApiCity(data) {
    let { latitude, longitude } = data.coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0d8c6b72fa8f4023069dbbc421571a5c`)
    .then(response => response.json())
    .then(data => showData(data))
    .catch(err => console.log(err))
}

function errorGetLocation() {
    errorText.innerHTML = 'Location access denied'
}

const humidityIcon = '<img class="icon" src="./img/humidity.png">'
const feellikeIcon = '<img class="icon" src="./img/feellike.png">'
const cityIcon = '<img class="icon" src="./img/pin.png">'

function showData(data) {
    let kelvin = data.main.feels_like
    let celcius = kelvin - 273.15
    icon(data.weather[0].id)
    city.innerHTML = `${cityIcon}${data.name}`
    weather.innerHTML = data.weather[0].description
    feelLike.innerHTML = `${feellikeIcon}feel like: ${celcius.toFixed(1)} &#176C`
    humidity.innerHTML = `${humidityIcon}humidity: ${data.main.humidity}`
    box.style.display = "inherit"
    container.style.display = "none"
    errorText.innerHTML = ''
}
/* input way */

function getCity() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Input.value}&appid=0d8c6b72fa8f4023069dbbc421571a5c`)
    .then(response => response.json())
    .then(data => showData(data))
    .catch(err => error(err))
}

function error() {
    errorText.innerHTML = 'Location not found'
}

/* icon section */

const icon = (value) => {
    if (value <= 232) {
        iconBox.src = './img/storm.png'
    }else if(value <= 321 ) {
        iconBox.src = './img/drizzle.png'
    }else if(value <= 531) {
        iconBox.src = './img/rainy.png'
    }else if(value <= 622) {
        iconBox.src = './img/snowing.png'
    }else if(value <= 781) {
        iconBox.src = './img/foog.png'
    }else if(value === 800) {
        iconBox.src = './img/sun.png'
    }else {
        iconBox.src = './img/overcast.png'
    }
}

const backFunc = () => {
    box.style.display = 'none'
    container.style.display = 'inherit'
}

document.addEventListener('keydown', (press) => {
    if (!!Input.value) {
        if (press.key === 'Enter') {
            getCity()
            Input.value = '' 
        }
    }
    if (press.key === 'Escape') {
        backFunc()
    }
})

back.addEventListener('click', backFunc)
getLocation.addEventListener('click', checkGeo)