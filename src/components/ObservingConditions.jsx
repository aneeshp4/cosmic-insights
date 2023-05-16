import React from "react";
import axios from "axios";
import Weather from "./Weather";
import { useState, useEffect } from "react";
import "../styles/styles.css";

function ObservingConditions(props) {
  const [zipCode, setZipCode] = useState("03755");
  const [latitude, setLatitude] = useState(43);
  const [longitude, setLongitude] = useState(-72);
  const [timeZone, setTimeZone] = useState("America/New_York");
  const [visibleObjects, setVisibleObjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make sure the zip code is valid
        if (zipCode.length !== 5) {
          return;
        }

        // Get the latitude and longitude of the zip code using mapbox API
        const mapbox_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;
        const mapBoxRequest = await axios.get(mapbox_url);
        const location = mapBoxRequest.data.features[0].center;
        const lng = Math.floor(location[0]);
        const lat = Math.floor(location[1]);
        setLatitude(lat);
        setLongitude(lng);

        // Get the timezone of the zip code using google maps API
        const googleMapsURL = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(
          Date.now() / 1000
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;
        const googleMapsRequest = await axios.get(googleMapsURL);
        const tZone = googleMapsRequest.data.timeZoneId;
        setTimeZone(tZone);

        let dateWithoutTZone = new Date(); // Get the current date and time
        let currentDate = new Date(
          dateWithoutTZone.toLocaleString("en-US", {
            timeZone: tZone,
          })
        ); //date in the local timezone of the zipcode

        let currentHour = currentDate.getHours(); // Get the current hour (0-23)
        if (currentHour < 23 && currentHour > 5) {
          // Set the time to 11:00pm (23:00) if it is between 5am and 11pm
          currentDate.setHours(23);
        }

        let isoDateTime = currentDate.toISOString(); // Get the ISO date-time string for the visibleplanets API call

        // Get the visible objects at the zip code and at 11pm/current time using the visibleplanets API
        const visible_planets_url = `https://api.visibleplanets.dev/v3?latitude=${lat}&longitude=${lng}&time=${isoDateTime}`;
        const response2 = await axios.get(visible_planets_url);
        setVisibleObjects(response2.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [zipCode]);

  return (
    <div id="visibility" class="section">
      <h1>What's Visible Tonight</h1>
      <div>
        <div className="zipcode-container">
          <h2>Enter your zip code: </h2>
          <input
            type="text"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            id="zipcode-input"
          />
        </div>

        <Weather
          latitude={latitude}
          longitude={longitude}
          timeZone={timeZone}
        />

        <div className="card" id="objects-card">
          {/* Make sure there are objects to render*/}
          {visibleObjects.length > 0 &&
            visibleObjects.map((object) => {
              const imgURL =
                "/planet-icons/" + object.name.toLowerCase() + ".svg";
              return (
                <div key={object.name} className="object-container">
                  <img src={imgURL}></img>
                  <div className="object-info">
                    <h2>{object.name}</h2>
                    <p>Constellation: {object.constellation}</p>
                    <p>Altitude: {object.altitude.toFixed(2)} Degrees</p>
                  </div>
                </div>
              );
            })}

          {/* If there are no objects to render, display a message */}
          {visibleObjects.length === 0 && <h2>No objects visible tonight</h2>}
        </div>
      </div>
    </div>
  );
}

export default ObservingConditions;
