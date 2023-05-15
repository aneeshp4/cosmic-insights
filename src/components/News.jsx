import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the current date and time
        const currentDate = new Date();

        // Calculate the date 7 days ago (getting articles from the last week)
        const sevenDaysAgo = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );

        // Get the ISO date string of 7 days ago
        const isoDate = sevenDaysAgo.toISOString();

        // Make request to get the news articles
        const newsURL = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&published_at__gte=${isoDate}`;
        const newsRequest = await axios.get(newsURL);
        setNews(newsRequest.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (url) => {
    // Open the URL in a new tab or window when the div is clicked
    window.open(url, "_blank");
  };

  return (
    <div id="news-section" class="section">
      <h1>News</h1>

      <div>
        <Carousel responsive={responsive} swipeable={false} draggable={false}>
          {news.map((article) => {
            return (
              <div
                onClick={() => handleClick(article.url)}
                key={article.id}
                className="news-item-container"
              >
                <div className="news-item">
                  <h2>{article.title}</h2>
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="news-img"
                  />
                  <p>{article.summary}</p>
                </div>
                
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default News;
