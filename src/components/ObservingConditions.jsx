import React from "react";
import axios from "axios";
import Weather from "./Weather";
import { useState, useEffect } from "react";

function ObservingConditions(props) {
  const [zipCode, setZipCode] = useState("03755");
  const [latitude, setLatitude] = useState(43);
  const [longitude, setLongitutde] = useState(-72);
  const [timeZone, setTimeZone] = useState("America/New_York");
  const [visibleObjects, setVisibleObjects] = useState([]);

  const mapbox_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (zipCode.length !== 5) {
          return;
        }

        // Get the latitude and longitude of the zip code using mapbox API
        const mapBoxRequest = await axios.get(mapbox_url);
        const location = mapBoxRequest.data.features[0].center;
        const lng = Math.floor(location[0]);
        const lat = Math.floor(location[1]);
        setLatitude(lat);
        setLongitutde(lng);
        console.log(Math.floor(Date.now() / 1000));

        const googleMapsURL = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(
          Date.now() / 1000
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

        // Get the current time at the zip code using timezonedb API
        const googleMapsRequest = await axios.get(googleMapsURL);
        console.log(googleMapsRequest.data);
        const tZone = googleMapsRequest.data.timeZoneId;
        setTimeZone(tZone);

        console.log(tZone);
        let dateWithoutTZone = new Date(); // Get the current date and time
        console.log(dateWithoutTZone);
        let currentDate = new Date(
          dateWithoutTZone.toLocaleString("en-US", {
            timeZone: tZone,
          })
        ); //date in the local timezone of the zipcode
        console.log(currentDate);

        
        let currentHour = currentDate.getHours(); // Get the current hour (0-23)
        if (currentHour < 23 && currentHour > 5) {
          // Set the time to 11:00pm (23:00) if it is between 5am and 11pm
          console.log("between 5am and 11pm");
          currentDate.setHours(23);
        }

        let isoDateTime = currentDate.toISOString(); // Get the ISO date-time string
        console.log(isoDateTime);

        // Get the visible objects at the zip code and at 9pm/current time using the visibleplanets API
        const visible_planets_url = `https://api.visibleplanets.dev/v3?latitude=${lat}&longitude=${lng}&time=${isoDateTime}`;
        const response2 = await axios.get(visible_planets_url);
        setVisibleObjects(response2.data.data);
        console.log(response2.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [zipCode]);

  return (
    <div>
      <h1>Tonight's Visibility</h1>
      {/* weather stuff*/}
      <Weather latitude = {latitude} longitude = {longitude} timeZone = {timeZone} />



      <h2>Enter your zip code to see what you can see tonight!</h2>
      <input
        type="text"
        value={zipCode}
        onChange={(event) => setZipCode(event.target.value)}
      />

      {visibleObjects.map((object) => {
        const imgURL = "/planet-icons/" + object.name.toLowerCase() + ".svg";
        return (
          <div key={object.name}>
            <img src={imgURL}></img>
            <h2>{object.name}</h2>
            <p>Constellation: {object.constellation}</p>
            <p>Altitude: {object.altitude.toFixed(2)} Degrees</p>
          </div>
        );
      })}
    </div>
  );
}

export default ObservingConditions;
