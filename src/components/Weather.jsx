import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Weather({zipcode}) {
    const [weather, setWeather] = useState([]);
    const [zipCode, setZipCode] = useState(zipcode);
    
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}&units=imperial`;
    
    useEffect(() => {
        if (zipCode.length !== 5) {
        return
        }
        axios
        .get(weather_url)
        .then((response) => {
            setWeather(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [zipCode]);
    
    return (
        <div className="weather">
        <h2>Weather</h2>
        <div className="weather-info">
            <p>Temperature: {weather.main?.temp}°F</p>
            <p>Feels Like: {weather.main?.feels_like}°F</p>
            <p>Humidity: {weather.main?.humidity}%</p>
            <p>Wind Speed: {weather.wind?.speed} mph</p>
        </div>
        </div>
    );

}

export default Weather;