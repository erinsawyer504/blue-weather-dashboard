let cityFormEl = document.querySelector('#city-form');
let cityInputEl = document.querySelector('#city');
let cityInfoEl = document.querySelector('#cityInfo');
let forecastEl = document.querySelector('.forecast');
let cityNameEl = document.querySelector('#cityName');
let currentDateEl = document.querySelector('#currentDate');
let weatherIconEl = document.querySelector('#weatherIcon');
let tempEl = document.querySelector('#temp');
let windEl = document.querySelector('#wind');
let humidityEl = document.querySelector('#humidity');
let btnEl = document.querySelector('.btn');



//API key 
let APIKey = "447b3007c14c6a40015847c686fd487a";

//TODO: add local storage
//TODO: add event listener to click on past searched cities
//TODO: add 5 day forecast headline
//TODO: fix date in 5 day forecast

let formInputSubmit = function (event) {
    event.preventDefault();
    let cityInput = cityInputEl.value.trim();
    if(cityInput){
        getCity(cityInput);
        getForecast(cityInput);
        //adding searched cities to list
        let ul = document.getElementsByTagName("ul")[0];
        let li = document.createElement("li");
        li.textContent = city.value;
        ul.prepend(li);
        cityInputEl.value = '';
        currentDateEl.innerHTML='';

    } else {
        alert('Please enter a city name');
    }
}

//Gets the weather for that day in the city user searches for
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
                
                //adding above variables to HTML
                cityNameEl.innerHTML=`${nameCity}`
                weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icn}@2x.png"/> `
                tempEl.innerHTML = `Temp: ${localTemp}°F`
                windEl.innerHTML = `Wind: ${windSpeed} MPH`
                humidityEl.innerHTML = `Humidity: ${humid}%`
                cityInfoEl.className="cityInfoClass"
                
            // Displays current date
            const $day = dayjs().format('MM' + '/' + 'DD' + '/' + 'YYYY');
            $('#currentDate').append($day);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

//Gets the 5 day forecast for requested city

let getForecast = function(city) {
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(forecastURL)
    .then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            for (let i=0; i < data.list.length; i+=8){
                //adding loop variables to HTML
                document.getElementById("day" +(i) +"Date").innerHTML = "Date: " + data.list[i].dt_txt;
                document.getElementById("day" +(i) +"Icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
                document.getElementById("day" +(i) +"Temp").innerHTML = "Temp: " + data.list[i].main.temp + "°F";
                document.getElementById("day" +(i) +"Wind").innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
                document.getElementById("day" +(i) +"Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
                document.getElementById("day" +(i)).className="forecast-card-design";
            }
        })
    })
}

cityFormEl.addEventListener('submit', formInputSubmit);