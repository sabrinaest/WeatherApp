// ------------- PERSONAL API KEY -----------------------------

const apiKey = 'REPLACE THIS WITH YOUR OpenWeatherMap API KEY';

// ------------------------------------------------------------

// -------------------------------------- VARIABLES/CONSTANTS ----------------------------------------
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] // array to help convert the day of week from .getDay() to a day name 

const newCitySearchInput = document.getElementById('new-city-search');
const newCitySearchBttn = document.getElementById('new-city-submit-button');
// const toggleButton = document.querySelector('.switch input[type="checkbox"]');
const currForecastDesc = document.getElementById('current-forecast-description');
const currForecastTemp = document.getElementById('current-forecast-temperature');
const tempToggle = document.getElementById('temp-toggle');
const wklyForecast = document.getElementById('5-day-forecast');
const cityInputName = document.getElementById('city-name');
const mainContent = document.getElementById('main-content');
const mainWeatherContent = document.getElementById('weather-content');

const city = getCityFromURl()                                   // calls function to get the city name from url 

// ---------------------------------------- EVENT LISTNERS ----------------------------------------

newCitySearchBttn.addEventListener('click', newCitySearch);     // event listener if user clicks the search button
tempToggle.addEventListener('click', convertTempUnits);

// ---------------------------------------- FUNCTION CALLS ----------------------------------------

function showMainContent() {
    mainContent.classList.remove('hidden-initially');
    mainWeatherContent.classList.remove('hidden-initially');
}

fetchcurrWeatherData(city)                                                          // calls and fetches current weather and calls another func to display data
    .then(currWeatherData => {
        displaycurrWeatherData(currWeatherData);
        showMainContent();
    })
    

fetchSunriseSunsetData(city);

fetchforecastData(city)             // calls and fetches forecast weather and calls another func to display data
    .then(forecastData => {
        displayforecastWeatherData(forecastData);
        showMainContent();
    })
    .catch(error => {
        console.error("Could not get forecast weather data");
    });

// ----------------------------------------- WEATHER FETCH FUNCTIONS ----------------------------------------

async function newCitySearch(event) {                       // function for user to search for new city's forecast
    event.preventDefault();                            
    const newCity = newCitySearchInput.value;
    if (newCity) {
        window.location.href = `forecast.html?city=` + newCity;
    }
    else {
        alert("Please enter a city in the search bar");         // catches if the user does not enter anything in the search bar
    }
}

function getCityFromURl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('city'); 
}

function convertTempUnits() {                                   // function that toggle button event listener calls if button gets clicked 
    const fahrenheitButton = document.querySelector('.fahrenheit');
    const celsiusButton = document.querySelector('.celsius');

    if (fahrenheitButton.classList.contains('font-bold')) {     
        celsiusButton.classList.add('font-bold', 'text-xl');
        fahrenheitButton.classList.remove('font-bold', 'text-xl');
        var currtempFahrenheit = document.getElementById('current-forecast-temperature');
        var currdegreeNumber = currtempFahrenheit.textContent.match(/(-?\d+\.?\d*)/);
        
        if (currdegreeNumber) {
            const currtempF = parseInt(currdegreeNumber[0]);
            const currtempC = ((currtempF - 32) * 5)/9;
            currtempFahrenheit.setAttribute('data-original-fahrenheit', currtempF);
            currtempFahrenheit.textContent = Math.round(currtempC);
        }
        
        var weeklyTemp = document.getElementById('5-day-forecast');
        var weeklyChildren = weeklyTemp.children;
        var i = 0;

        while (i < weeklyChildren.length) {
            var weekChild = weeklyChildren[i];
            var maxtempParagraph = weekChild.querySelector('#weekly-max-temp');
            var mintempParagraph = weekChild.querySelector('#weekly-min-temp');

            if (maxtempParagraph && mintempParagraph) {
                const weekmaxdegreeNumber = maxtempParagraph.textContent.match(/(-?\d+\.?\d*)\s?°/);
                const weekmindegreeNumber = mintempParagraph.textContent.match(/(-?\d+\.?\d*)\s?°/);

                if (weekmaxdegreeNumber && weekmindegreeNumber) {
                    var weekmaxtempF = parseInt(weekmaxdegreeNumber[0]);
                    var weekmaxtempC = ((weekmaxtempF - 32) * 5)/9;
                    maxtempParagraph.setAttribute('week-data-original-max-fahrenheit', weekmaxtempF);
                    maxtempParagraph.textContent = Math.round(weekmaxtempC) + "°";

                    var weekmintempF = parseInt(weekmindegreeNumber[0]);
                    var weekmintempC = ((weekmintempF - 32) * 5)/9;
                    mintempParagraph.setAttribute('week-data-original-min-fahrenheit', weekmintempF);
                    mintempParagraph.textContent = Math.round(weekmintempC) + "°";
                }
                
            }
        i++;
        }
    }

    else {                                                      // then the toggle is unchecked and user wants to display fahrenheit
        celsiusButton.classList.remove('font-bold', 'text-xl');
        fahrenheitButton.classList.add('font-bold', 'text-xl'); 
        var currtempCelsius = document.getElementById('current-forecast-temperature');
        var orgdegreeNumber = currtempCelsius.getAttribute('data-original-fahrenheit');

        if (orgdegreeNumber) {
            currtempCelsius.textContent = `${orgdegreeNumber}` + "";
        }

        var weeklyTemp = document.getElementById('5-day-forecast');
        var weeklyChildren = weeklyTemp.children;
        var i = 0;

        while (i < weeklyChildren.length) {
            var weekChild = weeklyChildren[i];
            var maxtempParagraph = weekChild.querySelector('#weekly-max-temp');
            var mintempParagraph = weekChild.querySelector('#weekly-min-temp');

            if (maxtempParagraph) {
                var tempmaxCelsius = maxtempParagraph.getAttribute('week-data-original-max-fahrenheit');
                maxtempParagraph.textContent = `${tempmaxCelsius}` + "°";
                var tempminCelsius = mintempParagraph.getAttribute('week-data-original-min-fahrenheit');
                mintempParagraph.textContent = `${tempminCelsius}` + "°";
            }
            i++;
        }
    }
}

async function fetchcurrWeatherData(city, units = 'imperial'){                      // gets the current weather using the weather api 
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    const currWeatherResponse = await fetch(apiURL);
    if (currWeatherResponse.ok){
        const currWeatherData = await currWeatherResponse.json();
        return currWeatherData;                                                     // returns current weather data 
    }
    else {
        alert("Unable to retrieve forecast, please enter valid location");
        console.error("Could not fetch weather data");
        window.location.href = `forecast.html?city=` + "Los Angeles";
        return fetchcurrWeatherData('Los Angeles');
    }
}

async function fetchSunriseSunsetData(city){
    const response = await fetch(`http://localhost:3000/sunrise-sunset/${city}`);   // gets the city variable and sends a request to the url using the endpoint set up by app.js
    const data = await response.json();     // waits for response and parses reponse as json
    
    if ('sunrise' in data){         // if sunrise key in response data then microservice was able to retrieve sunrise/sunset time
        const sunrise = data['sunrise'];    
        const sunset = data['sunset'];

        console.log(`Sunrise: ${sunrise} Sunset: ${sunset}`);

        displaySunriseSunsetData(sunrise, sunset);      // gets the times for sunrise and sunset and call display function to display it on forecast page

        return {sunrise, sunset}; 
    }
    else if ('error_message' in data){      // if error_message in response data then fetch data for los angeles as default (usually if invalid city input)
        console.log("City not found!");
        fetchSunriseSunsetData("Los Angeles");
        return
    }
    else {
        console.log('Error: Microservice did not work');        // catch if microservice did not work
    }
}

async function fetchforecastData(city, units = 'imperial'){                          // gets the forecast data using forecast api
    const forecastapiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
    const wkforecastWeatherResponse = await fetch(forecastapiURL);
    if (wkforecastWeatherResponse.ok) {
        const forecastData = await wkforecastWeatherResponse.json();
        return forecastData;
    }
    else {
        console.error("Could not fetch forecast weather data");
        return fetchforecastData('Los Angeles');
    }
}

// ----------------------------------------- WEATHER DISPLAY FUNCTIONS ----------------------------------------

function displaycurrWeatherData(currWeatherData, units = 'imperial'){               // displays the daily forecast
    currForecastDesc.textContent = currWeatherData.weather[0].description;          // gets the weather info from the variable holding the json data
    cityInputName.textContent = currWeatherData.name;
    const weatherIcon = document.getElementById("icon");
    weatherIcon.src = `/icons/${currWeatherData.weather[0].icon}.svg`;
    weatherIcon.className = "h-72";
    if (units === 'imperial'){                                                      // displays the units in either fahrenheit or celsius
        currForecastTemp.textContent = Math.round(currWeatherData.main.temp);
    }
    else {
        currForecastTemp.textContent = Math.round(currWeatherData.main.temp);
    }
}

function displayforecastWeatherData(forecastData, units = 'imperial'){  // displays the 5-day forecast
    while (wklyForecast.firstChild) {                           // remove previous data from page (fixes bug where it would reprint forcast in converted temp) 
        wklyForecast.removeChild(wklyForecast.firstChild);
    }

    let dateMaxTemp = {};
    let dateMinTemp = {};

    forecastData.list.forEach((value, index) => {
        if (value.dt_txt.includes('00:00:00')) {
            var eachDate = value.dt_txt.split(' ')[0];
            dateMaxTemp[eachDate] = value; 
            dateMinTemp[eachDate] = value;
        }
    })

    for (let eachDate in dateMinTemp) {
        forecastData.list.forEach((value, index) => {
            if (value.dt_txt.includes(eachDate)) {
                if (value.main.temp < dateMinTemp[eachDate].main.temp) {
                    dateMinTemp[eachDate] = value;
                }
            }
        })
    }

    for (let eachDate in dateMaxTemp) {
        forecastData.list.forEach((value, index) => {
            if (value.dt_txt.includes(eachDate)) {
                if (value.main.temp > dateMaxTemp[eachDate].main.temp) {
                    dateMaxTemp[eachDate] = value;
                }
            }
        })

    }

    for (let eachDate in dateMaxTemp) {             // goes through the list and display forecast captured at time 18:00:00 for each day
        const weeklyMaxdata = dateMaxTemp[eachDate];
        const date = new Date(weeklyMaxdata.dt_txt);
        const daynum = date.getDay();
        const dayname = days[daynum];
        const maxTemp = weeklyMaxdata.main.temp;
        const minTemp = dateMinTemp[eachDate].main.temp;
        const weatherdescr = weeklyMaxdata.weather[0].description;

        const daydiv = document.createElement('div');       // creates the div for each day
        daydiv.className = "bg-white bg-opacity-10 backdrop-blur-sm rounded-lg my-3 p-3 shadow-md antialised flex flex-col items-center justify-center";
        const weatherimg = document.createElement('div');   // creates a div to hold the weather ico
        const weatherdesandtemp = document.createElement('div');    // creates a div to hold the weather info (description and temp)
        weatherdesandtemp.className = "flex flex-col items-center";
        
        const dayheader = document.createElement('h3');     // displays days of the week
        dayheader.textContent = dayname;
        dayheader.className = "text-white text-xl";                  // name to help reference it in the html file
        daydiv.appendChild(dayheader);                      // append to the main div

        const iconimg = document.createElement('img');      // gets icon src from openweather, displays icon
        iconimg.src = `/icons/${weeklyMaxdata.weather[0].icon}.svg`;
        iconimg.className = "w-28 h-28";
        weatherimg.appendChild(iconimg);                    // add it to the weather img div

        const dayweatherdescr = document.createElement('p'); // displays weather description
        dayweatherdescr.textContent = weatherdescr;
        dayweatherdescr.className = "text-black opacity-40 font-normal antialiased"

        const dayMinMaxTemp = document.createElement('div');
        dayMinMaxTemp.className = 'flex items-center';

        const daymaxtemp = document.createElement('p');        // displays temp in either fahrenheit or celsius
        daymaxtemp.id = 'weekly-max-temp';
        daymaxtemp.className = "text-white font-semibold text-3xl";                      // help reference it in the html file

        const daymintemp = document.createElement('p');
        daymintemp.id = 'weekly-min-temp';
        daymintemp.className = "text-white font-light opacity-70 text-sm pt-1 pl-1";  

        if (units === 'imperial'){
            daymaxtemp.textContent = Math.round(maxTemp) + "°";
            daymintemp.textContent = Math.round(minTemp) + "°";
        }
        else {
            daymaxtemp.textContent = Math.round(maxTemp) + "°";
            daymintemp.textContent = Math.round(minTemp) + "°";
        }

        dayMinMaxTemp.appendChild(daymaxtemp);
        dayMinMaxTemp.appendChild(daymintemp);

        weatherdesandtemp.appendChild(dayMinMaxTemp);             // add it to the weather info div
        weatherdesandtemp.appendChild(dayweatherdescr);     // add it to the weather info div

        daydiv.appendChild(weatherimg);                     // append the image div to the main day div
        daydiv.appendChild(weatherdesandtemp);              // append the weather info div to the main day div
        wklyForecast.appendChild(daydiv);                   // append div element to main forecast div
       }
    }


function displaySunriseSunsetData(sunrise, sunset){
    const div = document.getElementById('current-forecast-sunrise-sunset');        // main div to append sunrise and sunset times
    while (div.firstChild) {                           // remove previous data from page  
        div.removeChild(div.firstChild);
    }
    
    const sunriseContainer = document.createElement('div');
    sunriseContainer.className = 'flex items-center space-x-3'; 

    const sunriseImg = document.createElement('img');
    sunriseImg.src = '/icons/sunrise.svg';
    sunriseImg.className = 'h-10';

    const sunriseElement = document.createElement('p');
    sunriseElement.textContent = `${sunrise}`;     // add data to text of paragraph for sunrise

    sunriseContainer.appendChild(sunriseImg);
    sunriseContainer.appendChild(sunriseElement);

    const sunsetContainer = document.createElement('div');
    sunsetContainer.className = 'flex items-center space-x-3'; 

    const sunsetImg = document.createElement('img');
    sunsetImg.src = '/icons/sunset.svg';
    sunsetImg.className = 'h-10'


    const sunsetElement = document.createElement('p');
    sunsetElement.textContent = `${sunset}`;        // add data to text of paragraph for sunset
  
    sunsetContainer.appendChild(sunsetImg);
    sunsetContainer.appendChild(sunsetElement);

    div.appendChild(sunriseContainer);                // append the sunrise and sunset containers to the main div
    div.appendChild(sunsetContainer);
}
