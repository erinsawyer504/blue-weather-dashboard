let cityFormEl = document.querySelector('#city-form');
let cityInputEl = document.querySelector('#city');
let cityInfoEl = document.querySelector('#cityInfo');
let forecastEl = document.querySelector('#forecast');
let cityNameEl = document.querySelector('#cityName');
let currentDateEl = document.querySelector('#currentDate');
let weatherIconEl = document.querySelector('#weatherIcon');
let tempEl = document.querySelector('#temp');
let windEl = document.querySelector('#wind');
let humidityEl = document.querySelector('#humidity');
let btnEl = document.querySelector('.btn');

// let APIKey = "447b3007c14c6a40015847c686fd487a";

// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial&appid=" + APIKey;

//TODO: add a search for a city
//TODO: add in buttons for previous cities searched
//TODO: show city searched with current date, weather icon, temp (deg F), wind (MPH), humdity(%)
//TODO: show 5 Day Forcast for city searched
//TODO: add local storage
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=27103&units=imperial&appid=447b3007c14c6a40015847c686fd487a";

function fetchData() {
    console.log("TEST")
    fetch(queryURL)
        .then(response => response.json())
        .then(data => console.log(data));
    sleep(1000);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

btnEl.addEventListener('click', fetchData);

// btnEl.addEventListener('click', () => {
//     fetch(queryURL)
//     .then((response) => response.json())
//     .then(data => {

//     let nameCity = data['name']
//     console.log(data['name'])
//     let localTemp = data['main']['temp']
//     let wndspd = data['wind']['speed']
//     let icn = data['icon']

//     cityNameEl.innerHTML=`${nameCity}`
//     tempEl.innerHTML = `${localTemp}`
//     windEl.innerHTML = `${wndspd}`
//     weatherIconEl.innerHTML = `${icn}`

//     })
// })

// Displays current date in the header as Day of week, Month date (i.e. Monday, January 2)
const $day = dayjs().format('MM' + '/' + 'DD' + '/' + 'YYYY');
$('#currentDate').append($day);
