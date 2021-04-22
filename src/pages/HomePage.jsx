import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Image, Row, } from "react-bootstrap";

import AutoCompelteInput from '../components/AutoCompelteInput';
import weatherRequests from '../api/weatherRequests';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/ForecastCard';
import { lastOpenLocation, lastOpenWeather } from '../redux/weather/weather_action';

const HomePage = ({ metric, currentWeather, currentLoction, lastOpenLocation, lastOpenWeather }) => {
  const [search, setSearch] = useState("");
  const [fiveDaysWeather, setfiveDaysWeather] = useState(null);
  const [loadingMain, setLoadingMain] = useState(false)
  const [loadingFive, setLoadingFive] = useState(false)
  const [canLike, setcanLike] = useState(false)
  useEffect(() => {
    if (currentLoction) {
      (async () => {
        try {
          setcanLike(false)
          setLoadingMain(true);
          setLoadingFive(true);
          const { status } = await lastOpenWeather(currentLoction.Key);
          setLoadingMain(false);
          if (status === 'success') {
            const { data, status } = await weatherRequests.getfiveDaysForecasts(currentLoction.Key, metric)
            setLoadingFive(false)
            setcanLike(true)

            if (status === 'success')
              setfiveDaysWeather(data.DailyForecasts)
          }
        } catch (error) {
          console.log('error on server side', error)
        }

      })();
    }

  }, [currentLoction, metric, lastOpenWeather])



  const handleLoctionClick = (loction) => {
    try {

      lastOpenLocation(loction.Key)
    } catch (error) {
      alert("api error, The allowed number of requests has been exceeded")

    }
  }

  const handleChangeText = (text) => {
    setSearch(text);

  }

  const renderLoading = () => {
    return (
      <div>
        <Image src='./loading.gif' />
      </div>
    )
  }

  const renderFiveWeather = () => {
    if (loadingFive)
      return renderLoading()

    if (!fiveDaysWeather)
      return null


    return fiveDaysWeather.map((weather, i) =>
      <Col sm={12} md={4} lg={2} key={i}>
        <Forecast
          id={i}
          weather={weather}
          metric={metric}
        />

      </Col>
    )


  }



  const rendercurrentWeather = () => {
    if (loadingMain)
      return renderLoading();

    if (!currentWeather || !currentLoction)
      return null
    return <CurrentWeather selectCountry={currentLoction} metric={metric} currentWeather={currentWeather} />;

  }
  return (
    <Container className="homePage" >
      <AutoCompelteInput canLike={canLike} onClick={handleLoctionClick} search={search} setSearch={handleChangeText} />
      {rendercurrentWeather()}
      <div className='forecastWrapper' >
        <Row className='forecasts'>
          {renderFiveWeather()}
        </Row>
      </div>
    </Container>
  )
}
const mapStateToProps = ({ weather_reducer }) => ({
  metric: weather_reducer.metric,
  currentWeather: weather_reducer.lastOpenWeather,
  currentLoction: weather_reducer.lastOpenLocation
})


const mapDispatchToProps = {
  lastOpenLocation,
  lastOpenWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)