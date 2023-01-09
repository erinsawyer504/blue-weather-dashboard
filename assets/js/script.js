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

let APIKey = "447b3007c14c6a40015847c686fd487a";

////add a search for a city
//TODO: add in buttons for previous cities searched
////show city searched with current date, weather icon, temp (deg F), wind (MPH), humdity(%)
//TODO: show 5 Day Forcast for city searched
//TODO: 5 forcast - date, icon, temp, wind, humidity
//TODO: add local storage
//TODO: add show class for #cityinfo so that the border only shows when a city is searched

let formInputSubmit = function (event) {
    event.preventDefault();
    let cityInput = cityInputEl.value.trim();
    if(cityInput){
        getCity(cityInput);
        cityInputEl.value = '';
    } else {
        alert('Please enter a city name');
    }
}

let getCity = function(city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                let nameCity = data['name']
                let icn = data.weather[0].icon;                
                let localTemp = data['main']['temp']
                let windSpeed = data['wind']['speed']
                let humid = data['main']['humidity']

            cityNameEl.innerHTML=`${nameCity}`
            weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icn}@2x.png"/> `
            tempEl.innerHTML = `Temp: ${localTemp}°F`
            windEl.innerHTML = `Wind: ${windSpeed} MPH`
            humidityEl.innerHTML = `Humidity: ${humid}%`
            // Displays current date 
            const $day = dayjs().format('MM' + '/' + 'DD' + '/' + 'YYYY');
            $('#currentDate').append($day);

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

//Get date, icon, temp, wind, humidity
//date - dt_txt (day 1 is next day)
//icon - weather.icon
//temp -temp day or main temp i dont know
//wind - wind speed
//humidity - main humidity
let getForcast = function(lat, lon) {
    // let forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    let forcastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=447b3007c14c6a40015847c686fd487a`
    fetch(forcastURL)
    .then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            let ficn = data.weather[0].icon;
            console.log(ficn)                
            let flocalTemp = data['main']['temp']
            console.log(flocalTemp)
            // let fwindSpeed = data['wind']['speed']
            // let fhumid = data['main']['humidity']

        })
    })
}

cityFormEl.addEventListener('submit', formInputSubmit);

// Displays current date in the header as Day of week, Month date (i.e. Monday, January 2)
// const $day = dayjs().format('MM' + '/' + 'DD' + '/' + 'YYYY');
// $('#currentDate').append($day);
