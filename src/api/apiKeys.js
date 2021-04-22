
const apiKey = 'a39nt3GG9ZNiFsNmXADD0n4KWPSrlIhf'

exports.getfiveDaysForecastsUrl = (locationKey, metric) => `/forecasts/v1/daily/5day/${locationKey}?metric=${metric}&apikey=${apiKey}&details=true`

exports.getAutoCompleteSearchesUrl = (query) => `/locations/v1/cities/autocomplete?q=${query}&apikey=${apiKey}`

exports.getCurrentWeatherUrl = (locationKey) => `/currentconditions/v1/${locationKey}?apikey=${apiKey}`

exports.getCurrentlocationUrl = (locationKey) => `/locations/v1/${locationKey}?apikey=${apiKey}`

exports.iconUrl = number => `https://developer.accuweather.com/sites/default/files/${processIconNumber(number)}-s.png`



let processIconNumber = (num) => {
  if (num < 10)
    return '0' + num

  return num

}