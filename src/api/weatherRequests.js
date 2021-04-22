import { getAutoCompleteSearchesUrl, getfiveDaysForecastsUrl, getCurrentWeatherUrl, getCurrentlocationUrl } from "./apiKeys";
import weatherApi from "./weatherApi";


export default class weatherRequests {

  static async getCurrentWeather(locationKey) {
    try {

      const { data } = await weatherApi.get(getCurrentWeatherUrl(locationKey));
      if (data.length) {
        return { status: 'success', data: data[0] }
      } else
        return { status: 'didntFound', data: data }
    } catch (error) {
      throw error
    }
  }
  static async getCurrentlocation(locationKey) {
    try {
      const { data } = await weatherApi.get(getCurrentlocationUrl(locationKey));
      if (data) {
        return { status: 'success', data }
      } else
        return { status: 'didntFound', data: data }
    } catch (error) {
      throw error
    }
  }

  static async getfiveDaysForecasts(locationKey, metric) {
    try {
      const { data } = await weatherApi.get(getfiveDaysForecastsUrl(locationKey, metric));
      return { status: 'success', data }
    } catch (error) {
      throw error
    }
  }

  static async getAutoCompleteSearches(query) {
    try {
      const { data } = await weatherApi.get(getAutoCompleteSearchesUrl(query));
      return { data, status: 'success' }
    } catch (error) {
      throw error
    }
  }


}