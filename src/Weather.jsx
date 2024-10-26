import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'cdafcd2136e74a4bbdd163048242410';
  const city = 'New Delhi';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Weather in {weatherData.location.name}</h2>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>
      <p>Feels like: {weatherData.current.feelslike_c}°C</p>
    </div>
  );
};

export default Weather;
