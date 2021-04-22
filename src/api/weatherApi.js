import axios from 'axios';
var config = {
  headers: { 'Access-Control-Allow-Origin': '*' }
};
export default axios.create({ baseURL: 'http://dataservice.accuweather.com' }, config);