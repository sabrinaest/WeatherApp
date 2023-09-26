# Weather App with Express-Python Microservice Integration

https://github.com/sabrinaest/WeatherApp/assets/102570901/632c4a3a-8613-4cac-962f-fc92067561d3

## 📝 Program Description

ExacWeather application prompts the user to enter a city name in order to display its forecast. Once a valid city name is entered, the application directs them to the forecast page that displays the current temperature, weather description and the sunrise/sunset times (sources directly from an integreated microservice written by collaborator Nico Davis). 

Additionally, the application presents the user with the 5-day forecast with the high and low temperatures for the upcoming days. Users can effortlessly toggle between Celsius and Fahrenheit as per their preference. If the user would like to view another city's forecast they can input a new search at the top of the page. In instances of invalid city inputs, the forecast page informs the user and defaults to Los Angeles, ensuring a consistent user experience. 

## ✨ Features

* **Comprehensive Weather Data**: Utilizing OpenWeatherMap's API, users can input a city to receive a comprehensive weather overview for the day and the upcoming 5-day period.
* **Integrated Sunrise and Sunset**: Collaboratively sourced from a partner-developed microservice, the app displays the sunrise and sunset time for the current day.
* **Temperature Conversion**: Users can toggle effortlessly between Celsius and Fahrenheit to match their preferred temperature reading.
* **Express and ZeroMQ Communication**: Combines Express.js backend with ZeroMQ sockets for real-time data exchange with the Python-based microservice.
* **Intuitive Frontend and UI**: Designed with TailwindCSS, the interface is both responsive and user-friendly. 
* **Error-Handling**: On invalid city entries, the system gracefully defaults to the Los Angeles forecast, ensuring uninterrupted user engagement.

## 🛠️ Setup and Installation

1. Setup Essentials:
   * Python 3.10: Needed for the Python-based microservice
   * TailwindCSS: Follow the [TailwindCSS Installation Guide](https://tailwindcss.com/docs/installation)
   * ZeroMQ: Install the necessary [ZeroMQ libraries](https://zeromq.org/languages/python)  
   * OpenWeatherMap API Key: Obtain a key by signing up at [OpenWeatherMap](https://openweathermap.org) (it's free!) 

2. Clone the Repository:

   ```
   git clone https://github.com/sabrinaest/WeatherApp.git
   ```

3. Navigate to the Directory:

   ```
   cd WeatherApp
   ```

4. Install the Dependencies:

   ```
   npm install
   ```

5. Open microservice.py and insert your API key:
   * At the top of the file you'll see:
     
     ```
     # ------------------ PERSONAL API KEY ---------------------- # 
     apikey = 'REPLACE THIS WITH YOUR OpenWeatherMap API KEY'
     # ---------------------------------------------------------- #
     ```
   
   * Replace 'REPLACE THIS WITH YOUR OpenWeatherMap API KEY' with your actual API key, make sure to keep it between the single quotes. For example, if your API key is 'abcdef1234567', it should look like this:

     ```
     apikey = 'abcdef1234567'
     ```

   * Be sure to save your changes
     
6. Open forecast.js located in the public folder and insert your API key:
   * At the top of the file you'll see:

     ```
     // ------------- PERSONAL API KEY -----------------------------

     const apiKey = 'REPLACE THIS WITH YOUR OpenWeatherMap API KEY';

     // ------------------------------------------------------------
     ```

    * Replace 'REPLACE THIS WITH YOUR OpenWeatherMap API KEY' with your actual API key, make sure to keep it between the single quotes. For example, if your API key is 'abcdef1234567', it should look like this:
  
      ```
      const apiKey = 'abcdef1234567';
      ```

    * Be sure to save your changes

7. Run the microservice:

   ```
   python microservice.py
   ```

8. Start the application in a new terminal:

   ```
   npm start
   ```

9. Launch your preferred browser and visit http://localhost:3000/ to interact with the Weather App!
   

## 📚 Documentation & References

**Official Documentation**

* [OpenWeatherMap API Documentation](https://openweathermap.org/api/one-call-3): A comprehensive guide into how the OpenWeatherMap API works and the data that it gathers.

* [ZeroMQ with Python](https://zeromq.org/languages/python/): Understand the integration of ZeroMQ with Python and how it can be used for real-time data exchange.

* [TailwindCSS Documentation](https://tailwindcss.com/docs/installation): An in-depth guide to the CSS framework used to style this application.

* [Express.js Documentation](https://expressjs.com/en/guide/routing.html): Learn more about the backend framework used for routing and server setup.


