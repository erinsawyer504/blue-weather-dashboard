let cityFormEl = document.querySelector('#city-form');
let cityInputEl = document.querySelector('#city');
let cityInfoEl = document.querySelector('#cityInfo');
let forecastEl = document.querySelector('.forecast');
let forecast5El = document.querySelector('#forecast5');
let cityNameEl = document.querySelector('#cityName');
let weatherIconEl = document.querySelector('#weatherIcon');
let tempEl = document.querySelector('#temp');
let windEl = document.querySelector('#wind');
let humidityEl = document.querySelector('#humidity');
let btnEl = document.querySelector('.btn');
let clickCity = document.querySelector('#show-city');


//API key 
let APIKey = "447b3007c14c6a40015847c686fd487a";

//function pulls the information out of the local storage and adds it as a list item under the search field in alphabetized order
let updateUI = function () {
    let values = [], keys = Object.keys(localStorage).sort(), i = keys.length;
    while (i--) { values.push( localStorage.getItem(keys[i]) ); }
    let ul = document.getElementsByTagName("ul")[0];
    //to prevent logging previous searched cities
    ul.innerHTML="";
    for (i = 0; i<values.length; i++){
    let li = document.createElement("li");
    li.textContent = values[i];
    ul.prepend(li);
    //gives the list items an attribute so it can be clicked on and will display the city weather again when buttonClickHandler() is called
    li.setAttribute("id", values[i]);
    }
} 

let formInputSubmit = function (event) {
    event.preventDefault();
    let cityInput = cityInputEl.value.trim();
    if(cityInput){
        getCity(cityInput);
        getForecast(cityInput);
        cityInputEl.value = '';
        forecast5El.innerHTML = '5 Day Forecast: ';
        localStorage.setItem(cityInput, cityInput);
        updateUI();
    } else {
        alert('Please enter a city name');
    }
}

//loads local storage when page loads
window.addEventListener("DOMContentLoaded", function(){
updateUI();
})


//Gets the weather for that day in the city user searches for
let getCity = function(city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                // Displays current date
                let day = new Date().toLocaleDateString("en-US");
                let nameCity = data['name'];
                let icn = data.weather[0].icon;                
                let localTemp = data['main']['temp'];
                let windSpeed = data['wind']['speed'];
                let humid = data['main']['humidity'];
                
                //adding above variables to HTML
                cityNameEl.innerHTML = nameCity + " (" + day + ")";
                weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icn}@2x.png"/> `;
                tempEl.innerHTML = `Temp: ${localTemp}°F`;
                windEl.innerHTML = `Wind: ${windSpeed} MPH`;
                humidityEl.innerHTML = `Humidity: ${humid}%`;
                cityInfoEl.className="cityInfoClass";
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
            //Setting for loop at i =7 & i+= 8 to get next day weather since api does forecast in 3 hour increments
            for (let i=7; i < data.list.length; i+=8){
                let date = data.list[i].dt_txt;
                //splitting the date so it can be formatted as MM/DD/YYYY
                let dateSplit = date.split(/[-\s]+/);
                //adding loop variables to HTML
                document.getElementById("day" +(i) +"Date").innerHTML = "Date: " + dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];
                document.getElementById("day" +(i) +"Icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`;
                document.getElementById("day" +(i) +"Temp").innerHTML = "Temp: " + data.list[i].main.temp + "°F";
                document.getElementById("day" +(i) +"Wind").innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
                document.getElementById("day" +(i) +"Humidity").innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
                document.getElementById("day" +(i)).className="forecast-card-design";
            }
        })
    })
}

//Creating function to click on previous cities to show the weather
let buttonClickHandler = function(event) {
    let clickedCity = event.target.getAttribute('id');
    getCity(clickedCity);
    getForecast(clickedCity);
}


clickCity.addEventListener('click', buttonClickHandler);
cityFormEl.addEventListener('submit', formInputSubmit);
