import axios from 'axios';
import NodeCache from 'node-cache';

// Cache weather for 3 hours
const cache = new NodeCache({ stdTTL: 10800 });

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeatherForecast = async (lat, lon) => {
  if (!OPENWEATHER_KEY) return null;

  const cacheKey = `weather_${lat}_${lon}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: { lat, lon, appid: OPENWEATHER_KEY, units: 'metric' }
    });

    const data = response.data;
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('OpenWeather API Error:', error.message);
    return null;
  }
};
