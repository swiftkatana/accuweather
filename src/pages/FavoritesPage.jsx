import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { lastOpenLocation, lastOpenWeather } from '../redux/weather/weather_action'
import Forecast from '../components/ForecastCard';
import { useHistory } from 'react-router-dom'
const FavoritesPage = ({ lastOpenWeather, lastOpenLocation, favorites, metric }) => {
  const history = useHistory()
  const handlerClickOnWeather = async (weather) => {
    try {
      await lastOpenWeather(weather.Key)
      await lastOpenLocation(weather.Key)
      history.push('/')

    } catch (error) {
      alert(error)
    }
  }

  const renderListOfFavorites = () => {
    let arrFavorites = Object.values(favorites)
    if (arrFavorites.length > 0)
      return arrFavorites.map((favorite, index) => {
        return (
          <Col className='forecastCard' sm={2} md={3} lg={2} key={index} onClick={() => handlerClickOnWeather(favorite)}>
            <Forecast
              favorite
              weather={favorite}
              metric={metric}
            />
          </Col>
        )
      });

    return <h1>you dont have any favorites</h1>
  }





  return (
    <Container className='favoritesPage' >
      <Row className='forecasts'>
        {renderListOfFavorites()}

      </Row>
    </Container>
  )
}
const mapStateToProps = ({ weather_reducer }) => ({
  metric: weather_reducer.metric,
  currentWeather: weather_reducer.lastOpenWeather,
  favorites: weather_reducer.favorites,
  currentLoction: weather_reducer.lastOpenLocation
})
const mapDispatchToProps = {
  lastOpenLocation,
  lastOpenWeather
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage)
