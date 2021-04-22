import React from 'react'
import LeabelMain from './LeabelMain';
import SmallLabel from './SmallLabel';
import WeatherIcon from './WeatherIcon';
export default function CurrentWeather({ currentWeather, selectCountry, metric }) {

  const renderDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nocvember',
      'December',
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date(currentWeather.LocalObservationDateTime);
    return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
      }`;
  }

  const renderTextTemperature = () => {
    let data = metric ? currentWeather.Temperature.Metric : currentWeather.Temperature.Imperial
    return `${data.Value} ${data.Unit}`
  }
  return (
    <>
      <div className=' leabelsInfo'>
        <LeabelMain >
          {`${selectCountry.LocalizedName}, ${selectCountry.Country.ID}`}
        </LeabelMain>
        <SmallLabel>
          {renderDate()}
        </SmallLabel>
      </div>
      <div className='currentWeatherWrapper'>
        <WeatherIcon icon={currentWeather.WeatherIcon} />
        <div className='temperatureWrapper'>
          <h3 className='temperature'>
            {renderTextTemperature()}&#176;
          </h3>
          <SmallLabel>
            {currentWeather.WeatherText}
          </SmallLabel>
        </div>

      </div>





    </>

  )
}
