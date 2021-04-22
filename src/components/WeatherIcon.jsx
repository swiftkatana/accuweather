import React from 'react'
import { Image } from 'react-bootstrap'
import { iconUrl } from '../api/apiKeys'

export default function WeatherIcon({ icon }) {
  return (

    <div className='imageWarper'>
      <Image className='currentWeatherImage' src={iconUrl(icon)} />
    </div>

  )
}
