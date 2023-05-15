import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/styles.css";

function PictureOfTheDay(props) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_PICTURE_KEY}`;

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="potd" class="section">
      <h1 className="potd-title">{data.title}</h1>
      <div className="card">
        <div className="potd-image">
          <img id="potd-img" src={data.url} alt={data.title} />
        </div>
        <p className="potd-desc">{data.explanation}</p>
      </div>
    </div>
  );
}

export default PictureOfTheDay;
