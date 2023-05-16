# Cosmic Insights
Hosted at: https://cosmic-insights.onrender.com/
### Description and Features
Cosmic Insights is a website that allows astronomy lovers to learn more about space and also lets them know what celestial bodies will be visible at night (or are currently visible if it is night).

It's main features are:
- A picture of the day, provided by NASA
- A weather and visibility report that shows which celestial bodies will be visible at night
- A news section that contains space related articles from the past week

[![Cosmic Insights Video](https://img.youtube.com/vi/Pbb-nOvb2I4/0.jpg)](https://www.youtube.com/watch?v=Pbb-nOvb2I4)

### Technologies Used

I used JavaScript and React to build this web app, and render.com to host it.

### Installation Instructions

Assuming you've cloned this repository and you have NodeJS installed.
1. Run `npm install` to install all the packages and dependencies to host the web app locally.
2. Run `npm start` to start the web app locally in development mode.
3. Open http://localhost:3000 to view it in the browser.

### APIs Used in This Project

- [NASA API](https://api.nasa.gov/)
    - The NASA API is used to get the picture of the day, along with its description and title.
- [Weather API](https://www.weather.gov/documentation/services-web-api#/default/gridpoint_forecast_hourly)
    - The Weather API is used to get the weather forecast for the upcoming/current night, to go along with the visibility report.
- [Visbility API](https://github.com/csymlstd/visible-planets-api)
    - The Visibility API is used to get the visibility report for the upcoming/current night, to find out which celestial bodies will be visible at night.
- [Mapbox API](https://docs.mapbox.com/api/overview/)
    - The Mapbox API is used to find the associated latitude and longitude of the user's inputted zipcode, so that the weather and visibility report can be generated for that location.
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview)
    - The Google Maps API is used to get the timezone of the user's inputted zipcode, so that the weather and visibility report can be generated properly, timewise, for that location.
- [Spaceflight News API](https://spaceflightnewsapi.net/)
    - The Spaceflight News API is used to get the space related articles from the past week.
