import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Weather({ latitude, longitude, timeZone }) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make request to get the associate grid location for the latitude and longitude
        const getGridURL = `https://api.weather.gov/points/${latitude},${longitude}`;
        const gridRequest = await axios.get(getGridURL);

        // Make request to get the hourly forecast for the grid location
        const hourlyForecastURL = gridRequest.data.properties.forecastHourly;
        const hourlyForecastRequest = await axios.get(hourlyForecastURL);
        const periods = hourlyForecastRequest.data.properties.periods;

        // Find the ideal period to display (11pm if during the day and before 11pm.)
        let idealPeriod = periods[0];
        if (
          idealPeriod.isDaytime &&
          new Date(idealPeriod.startTime).getHours() < 23
        ) {
          for (let i = 0; i < periods.length; i++) {
            if (new Date(periods[i].startTime).getHours() === 23) {
              idealPeriod = periods[i];
              break;
            }
          }
        }

        // Set the weather state to the ideal period
        setWeather(idealPeriod);
        console.log(weather);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [latitude, longitude, timeZone]);

  return (
    <div className="card" id="weather-card">
      {weather &&
        weather.shortForecast &&
        weather.shortForecast.toLowerCase().includes("Rain") && (
          <img src="/weather-icons/rain.svg" alt="rain" />
        )}
      {weather &&
        weather.shortForecast &&
        weather.shortForecast.toLowerCase().includes("cloud") && (
          <img src="/weather-icons/partly-cloudy.svg" alt="cloudy" />
        )}
      {weather &&
        weather.shortForecast &&
        weather.shortForecast.toLowerCase().includes("clear") && (
          <img src="/weather-icons/clear.svg" alt="clear" />
        )}
      <div className="weather-info">
        <h3>{weather.shortForecast}</h3>
        <p>Temperature: {weather.temperature}°F</p>
        {weather && weather.relativeHumidity && (
          <p>Relative Humidity: {weather.relativeHumidity.value}%</p>
        )}
        {/* conditionally render precipitation if it will rain */}
        {weather &&
          weather.probabilityOfPrecipitation &&
          weather.probabilityOfPrecipitation.value > 10 && (
            <p>
              Chance of Precipitation :{" "}
              {weather.probabilityOfPrecipitation.value}%
            </p>
          )}
        <p>Wind Speed: {weather.windSpeed}</p>
      </div>
    </div>
  );
}

export default Weather;
