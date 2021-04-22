import { REMOVE_FROM_FAVORITES, FETCH_FAVORITES, OPEN_LAST_WEATHER, ADD_TO_FAVORITES, CHANGE_MUSARE_TEMPERATURE, OPEN_LAST_LOCTION } from "./weather_action";

let INS = { favorites: {}, lastOpenWeather: null, metric: true, lastOpenLocation: null };

const weather_reducer = (state = INS, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_FAVORITES:
      state.favorites[payload.Key] = payload;
      return { ...state };

    case FETCH_FAVORITES:
      state.favorites = { ...state.favorites, ...payload }
      return { ...state };

    case REMOVE_FROM_FAVORITES:
      delete state.favorites[payload.Key];
      return { ...state };


    case OPEN_LAST_WEATHER:
      state.lastOpenWeather = payload;
      return { ...state };

    case CHANGE_MUSARE_TEMPERATURE:
      state.metric = !state.metric;
      return { ...state };


    case OPEN_LAST_LOCTION:
      state.lastOpenLocation = payload;
      return { ...state };

    default:
      return state;
  }
};


export default weather_reducer