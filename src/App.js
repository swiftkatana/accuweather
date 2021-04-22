import React, { useEffect } from "react";
import { Route, HashRouter } from "react-router-dom";
import { connect } from 'react-redux'


import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { fetchFavorites, lastOpenLocation, lastOpenWeather } from "./redux/weather/weather_action";

function App({ fetchFavorites, lastOpenLocation }) {


  useEffect(() => {
    (async () => {
      try {
        const lastOpenWeatherKey = localStorage.getItem("lastOpenWeather");
        if (lastOpenWeatherKey) {
          await lastOpenLocation(lastOpenWeatherKey);
        }
        fetchFavorites();
      } catch (error) {
        alert("api error, The allowed number of requests has been exceeded")
      }
    })()
  })


  return (
    <HashRouter >
      <Route path='/' component={Header} />
      <Route path="/" exact component={HomePage} />
      <Route path="/favorites" exact component={FavoritesPage} />
    </HashRouter>
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  fetchFavorites,
  lastOpenWeather,
  lastOpenLocation
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
