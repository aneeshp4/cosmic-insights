import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


function PictureOfTheDay(props) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_PICTURE_KEY}`;

  const [data, setData] = useState({});

  useEffect(() => {
    
    axios.get(url).then(
        (response) => {
            setData(response.data);
        }
    ).catch((error) => {
        console.log(error);
    });

  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.url} alt={data.title} />
      <p>{data.explanation}</p>
    </div>
  );
}

export default PictureOfTheDay;
