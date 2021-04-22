import React from 'react'
import SmallLabel from './SmallLabel';
import WeatherIcon from './WeatherIcon';

export default function Forecast({ weather, metric, favorite }) {
  const renderDate = () => {
    if (favorite)
      return (
        <SmallLabel key={12}>
          <p>{weather.EnglishName}</p>

        </SmallLabel>)

    const currentDate = new Date(weather.Date);
    return (
      <span className='spanForecastCard' align="center">
        <span className='spanForecastCard' align="center">
          {`${currentDate.getDate()}/${currentDate.getMonth()}`}
        </span>
      </span>
    );
  }

  const renderTextTemperatureMaximum = () => {
    if (favorite)
      return <SmallLabel key={1}>
        <p>{renderTextTemperature()}</p>

      </SmallLabel>

    let Maximum = metric ? weather.Temperature.Maximum : weather.Temperature.Maximum
    return <SmallLabel key={1}>
      <p>{`Max: ${Maximum.Value} ${Maximum.Unit} `}</p>

    </SmallLabel>
  }

  const renderTextTemperatureMinimum = () => {
    if (favorite)
      return null

    let Minimum = metric ? weather.Temperature.Minimum : weather.Temperature.Minimum
    return <SmallLabel key={2} >
      {`Min: ${Minimum.Value} ${Minimum.Unit} `}
    </SmallLabel>
  }

  const renderTextTemperature = () => {
    let data = metric ? weather.Temperature.Metric : weather.Temperature.Imperial
    return `${data.Value} ${data.Unit}`
  }

  const renderWeatherLeabel = () => {
    if (favorite)
      return (
        <SmallLabel key={0}>
          {weather.WeatherText}

        </SmallLabel>
      )

    return (
      <SmallLabel key={0}>
        {weather.Day.IconPhrase}

      </SmallLabel>)
  }


  const renderImage = () => {
    if (favorite)
      return <WeatherIcon icon={weather.WeatherIcon} />

    return <WeatherIcon icon={weather.Day.Icon} />
  }

  return (
    <div className='forecastCardWrapper'>
      {renderDate()}
      { renderImage()}
      { renderWeatherLeabel()}
      { renderTextTemperatureMaximum()}
      { renderTextTemperatureMinimum()}
    </div>
  );
};
