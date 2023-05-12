import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Weather({ latitude, longitude, timeZone }) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const getGridURL = `https://api.weather.gov/points/${latitude},${longitude}`;
      const gridRequest = await axios.get(getGridURL);
      const hourlyForecastURL = gridRequest.data.properties.forecastHourly;
      const hourlyForecastRequest = await axios.get(hourlyForecastURL);
      const periods = hourlyForecastRequest.data.properties.periods;

      let idealPeriod = periods[0];
      if (idealPeriod.isDaytime && new Date(idealPeriod.startTime).getHours() < 23) {
        for (let i = 0; i < periods.length; i++) {
          if (new Date(periods[i].startTime).getHours() === 23) {
            idealPeriod = periods[i];
            break;
          }
        }
      }

      setWeather(idealPeriod);
      console.log (weather);
      
    };
    fetchData();
  }, [latitude, longitude, timeZone]);

  return (
    <div className="weather">
      <h2>Tonight's Weather</h2>
      <div className="weather-info">
        <h3>{weather.shortForecast}</h3>
        <p>Temperature: {weather.temperature}°F</p>
        {weather && weather.relativeHumidity && (
          <p>Relative Humidity: {weather.relativeHumidity.value}%</p>
        )}
        {weather && weather.probabilityOfPrecipitation && (weather.probabilityOfPrecipitation.value > 10) && (
          <p>Chance of Precipitation : {weather.probabilityOfPrecipitation.value}%</p>
        )}
        <p>Wind Speed: {weather.windSpeed}</p>
      </div>
    </div>
  );
}

export default Weather;
