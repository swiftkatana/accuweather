import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from "redux-thunk";
import weather_reducer from './weather/weather_reducer';

const reducers = combineReducers({
  weather_reducer,
});

const composeEnhancers = (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25, })) || compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);