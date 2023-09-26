// -------------------------------------- VARIABLES/CONSTANTS ----------------------------------------

const cityInput = document.getElementById('input-city')
const submitButton = document.getElementById('submit-button')

// ---------------------------------------- EVENT LISTENERS ----------------------------------------

submitButton.addEventListener('click', citySearch);


// ------------------------------------------- FUNCTION ----------------------------------------

async function citySearch(event) {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        window.location.href = `forecast.html?city=` + city;        // redirects user to forecast page, stores their input in the url
    }
    else {
        alert("Please enter a city in the search bar");             // catches if user did not enter anything
    }
}

