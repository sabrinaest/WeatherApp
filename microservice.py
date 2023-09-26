# Coded by collaborator Nico Davis (github: baedirin)
# Citation: Please note that the ZeroMQ starter code was referenced to build this microservice.

import zmq
import requests
import json
import datetime

# ------------------ PERSONAL API KEY ---------------------- # 

apikey = 'REPLACE THIS WITH YOUR OpenWeatherMap API KEY'

# ---------------------------------------------------------- #

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")


while True:

    message = socket.recv()
    message = message.decode()

    url = f"https://api.openweathermap.org/data/2.5/weather?q={message}&appid={apikey}"

    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        sunrise = data['sys']['sunrise']
        sunset = data['sys']['sunset']

        sunrise = datetime.datetime.fromtimestamp(sunrise).strftime('%I:%M %p')     # convert data to display the 12 hour clock format (hh:mm:(AM or PM))
        sunset = datetime.datetime.fromtimestamp(sunset).strftime('%I:%M %p')

        reply_data = {"sunrise": sunrise, "sunset": sunset}
        socket.send(json.dumps(reply_data).encode())
    else:
        error_reply = {"error_message": "City not found"}
        socket.send(json.dumps(error_reply).encode())
