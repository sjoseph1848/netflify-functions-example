// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');
require('dotenv').config();
// ?name="bob"&last_name="vance"
// ?access_key="123"&query=1234,1234&forecast_days
const handler = async (event) => {
  const { lat, long } = event.queryStringParameters;

  const API_SECRET = process.env.API_SECRET
  const url = `http://api.weatherstack.com/current?access_key=${API_SECRET}&query=${lat},${long}&forcast_days=4`
  // localhost:8080/.netlify/functions/fetch-weather 

  try {
    const { data } = await axios.get(url);
    console.log('made it');
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    console.log('failed it');
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data })
    }
  }

}

module.exports = { handler }
