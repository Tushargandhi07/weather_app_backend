// key= 703c4683bddceff53ef05c875d7af14b
// http://api.weatherstack.com/current
//     ? access_key = 703c4683bddceff53ef05c875d7af14b
//     & query = New York



const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Weather data retrieval route
router.get('/:location', async (req, res) => {
  const location = req.params.location;
  const apiKey = '703c4683bddceff53ef05c875d7af14b'; // Replace with your OpenWeatherMap API key

  try {
    // Make a GET request to the OpenWeatherMap API
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`);
    const weatherData = await response.json();

    res.send(weatherData)

  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = {router};
