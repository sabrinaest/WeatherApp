// -------------------------------------- VARIABLES/CONSTANTS ----------------------------------------

const express = require('express');
const app = express();
const zmq = require('zeromq');
const path = require('path');
const port = 3000;

const sock = new zmq.Request;

sock.connect('tcp://localhost:5555');   // connects to 5555, the port that my partner's microservice uses

app.use(express.static(path.join(__dirname, 'public')));    // serves the files in the public folder (hold the rest of the code files for this app)
app.use(express.json());            // the app will use json to parse incoming requests

// -------------------------------------- GETTER FUNCTION ----------------------------------------

app.get('/sunrise-sunset/:city', async(req, res) => {       // function to handle get requests
    const cityName = req.params.city;                       // gets the city parameter and stores it in the cityName variable
    console.log(cityName);                                  

    await sock.send(cityName);                              // sends socket to zeromq port 5555 with cityname
    const [result] = await sock.receive();                  // receives the response, converts it into a string, parses it into an object
    const data = JSON.parse(result.toString());

    console.log(data);
    res.json(data);     // sends a json back to client
});

// ----------------------------------------- LISTENER ----------------------------------------

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`); // starts express server on port 3000 and includes link in console
});