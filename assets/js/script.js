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

//Selecting 5 day forcast selectors
// let day1El = document.querySelector('#day1');
// let day2El = document.querySelector('#day2');
// let day3El = document.querySelector('#day3');
// let day4El = document.querySelector('#day4');
// let day5El = document.querySelector('#day5');

//API key 
let APIKey = "447b3007c14c6a40015847c686fd487a";


////add a search for a city
////: add in buttons for previous cities searched
////show city searched with current date, weather icon, temp (deg F), wind (MPH), humdity(%)
//TODO: show 5 Day Forcast for city searched
//TODO: 5 forcast - date, icon, temp, wind, humidity
//TODO: add local storage
////: add show class for #cityinfo so that the border only shows when a city is searched

let formInputSubmit = function (event) {
    event.preventDefault();
    let cityInput = cityInputEl.value.trim();
    if(cityInput){
        getCity(cityInput);
        getForcast(cityInput);
        //adding searched cities to list
        let ul = document.getElementsByTagName("ul")[0];
        let li = document.createElement("li");
        li.textContent = city.value;
        ul.prepend(li);
        cityInputEl.value = '';
        // currentDateEl.value='';
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
            cityInfoEl.className="cityInfoClass"
            // Displays current date
            //TODO Fix date, keeps appending each time function is run
            const $day = dayjs().format('MM' + '/' + 'DD' + '/' + 'YYYY');
            $('#currentDate').append($day);
            
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

// Get date, icon, temp, wind, humidity
// date - dt_txt (day 1 is next day)

let getForcast = function(city) {
let forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(forcastURL)
    .then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        for (let i=0; i<5; i++){
            document.getElementById("day" +(i+1) +"Date").innerHTML = "Date: " + data.list[i].dt_txt;
            document.getElementById("day" +(i+1) +"Icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
            document.getElementById("day" +(i+1) +"Temp").innerHTML = "Temp: " + data.list[i].main.temp + "°F";
            document.getElementById("day" +(i+1) +"Wind").innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
            document.getElementById("day" +(i+1) +"Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
            let fDate = data['list'][i]['dt_txt']
                console.log(fDate)
            let fIcn = data['list'][i]['weather'][0]['icon']
                console.log(fIcn)                
            let fLocalTemp = data['list'][i]['main']['temp']
                console.log(fLocalTemp)
            let fWindSpeed = data['list'][i]['wind']['speed']
                console.log(fWindSpeed)
            let fHumid = data['list'][i]['main']['humidity']
                console.log(fHumid)
            
            // day1El.innerHTML=`<p>${fDate}</p> 
            // <img src="https://openweathermap.org/img/wn/${fIcn}@2x.png"/> 
            // <p>Temp: ${fLocalTemp}°F</p>
            // <p>Wind: ${fWindSpeed} MPH</p>
            // <p>Humidity: ${fHumid}%</p>`
            // day3El.innerHTML = `Temp: ${fLocalTemp}°F`
            // day4El.innerHTML = `Wind: ${fWindSpeed} MPH`
            // day5El.innerHTML = `Humidity: ${fHumid}%`
        }
        })
    })
}

cityFormEl.addEventListener('submit', formInputSubmit);