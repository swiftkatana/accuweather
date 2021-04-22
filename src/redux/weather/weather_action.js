import weatherRequests from "../../api/weatherRequests";

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES ';

export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES ';

export const FETCH_FAVORITES = 'FETCH_FAVORITES ';

export const OPEN_LAST_WEATHER = 'OPEN_LAST_WEATHER ';

export const OPEN_LAST_LOCTION = 'OPEN_LAST_LOCTION ';


export const CHANGE_MUSARE_TEMPERATURE = 'CHANGE_MUSARE_TEMPERATURE'

const locationINS = {
  "Version": 0,
  "Key": "",
  "Type": "",
  "Rank": 0,
  "LocalizedName": "",
  "Country": {
    "ID": "",
    "LocalizedName": ""
  },
  "AdministrativeArea": {
    "ID": "",
    "LocalizedName": ""
  }
}


export const changeMusareTemperature = (masure) => {
  return { type: CHANGE_MUSARE_TEMPERATURE, payload: masure }
}

export const addToFavorite = (location = locationINS) => dispatch => {
  try {
    let favoriteCountries = localStorage.getItem('favoriteCountries')

    if (favoriteCountries) {

      const arrayFavorites = favoriteCountries.split('-');
      const doWeHaveThisLocation = arrayFavorites.includes(String(location.Key));

      if (!doWeHaveThisLocation)
        localStorage.setItem('favoriteCountries', favoriteCountries + '-' + location.Key);

    } else
      localStorage.setItem('favoriteCountries', location.Key);

    dispatch({ type: ADD_TO_FAVORITES, payload: location });

    return { status: 'success', data: {} }

  } catch (error) {
    throw error;
  }
}


export const removeFromFavorite = (location = locationINS) => dispatch => {
  try {
    let favoriteCountries = localStorage.getItem('favoriteCountries')

    if (favoriteCountries) {
      const arrayFavorites = favoriteCountries.split('-');
      console.log(arrayFavorites);
      const doWeHaveThisLocation = arrayFavorites.includes(String(location.Key));
      console.log(doWeHaveThisLocation);

      if (!doWeHaveThisLocation)
        return { status: 'dontHaveFavorites', data: {} }

      let newString = arrayFavorites.filter(num => num !== String(location.Key)).join('-');

      localStorage.setItem('favoriteCountries', newString + '-');

      dispatch({ type: REMOVE_FROM_FAVORITES, payload: location });
      return { status: 'success', data: {} }
    }

    return { status: 'dontHaveFavorites', data: {} }

  } catch (error) {
    throw error;
  }
}

export const fetchFavorites = () => async dispatch => {
  try {
    let favoriteCountries = localStorage.getItem('favoriteCountries')
    let finalData = {};
    if (favoriteCountries) {
      let arrayFavorites = favoriteCountries.split('-');
      for (const locationKey of arrayFavorites) {
        if (!locationKey)
          continue
        try {
          const { data, status } = await weatherRequests.getCurrentWeather(locationKey);
          if (status === 'success') {
            const res = await weatherRequests.getCurrentlocation(locationKey)
            if (res.status === 'success')
              finalData[locationKey] = { ...data, ...res.data };
          }

        } catch (error) {
          console.log('error `', error)
        }

      }
      dispatch({ type: FETCH_FAVORITES, payload: finalData });
    }
  } catch (error) {
    throw error;
  }
}



export const lastOpenWeather = (locationKey = '') => async dispatch => {
  try {

    const { data, status } = await weatherRequests.getCurrentWeather(locationKey)
    if (status !== 'success')
      return { status, data }
    localStorage.setItem('lastOpenWeather', locationKey);
    dispatch({ type: OPEN_LAST_WEATHER, payload: data });
    return { status: 'success', data: {} }

  } catch (error) {
    throw error;
  }
}

export const lastOpenLocation = (locationKey = '') => async dispatch => {
  try {
    const { data, status } = await weatherRequests.getCurrentlocation(locationKey)
    if (status !== 'success')
      return { status, data }
    dispatch({ type: OPEN_LAST_LOCTION, payload: data });
    return { status: 'success', data: {} }

  } catch (error) {
    throw error;
  }
}