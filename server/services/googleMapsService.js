import axios from 'axios';
import NodeCache from 'node-cache';

// In-memory cache to prevent rate limiting, TTL 24 hours
const cache = new NodeCache({ stdTTL: 86400 });

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getCoordinates = async (address) => {
  if (!GOOGLE_MAPS_KEY) return null;

  const cacheKey = `geocode_${address}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: { address, key: GOOGLE_MAPS_KEY }
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      cache.set(cacheKey, location);
      return location;
    }
    return null;
  } catch (error) {
    console.error('Google Maps API Error:', error.message);
    return null;
  }
};
