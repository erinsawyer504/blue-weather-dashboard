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

let APIKey = "447b3007c14c6a40015847c686fd487a";
//let city;
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + APIKey;

//TODO: add a search for a city
//TODO: add in buttons for previous cities searched
//TODO: show city searched with current date, weather icon, temp (deg F), wind (MPH), humdity(%)
//TODO: show 5 Day Forcast for city searched
//TODO: add local storage

fetch(queryURL);
