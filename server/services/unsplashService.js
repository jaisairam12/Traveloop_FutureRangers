import axios from 'axios';
import NodeCache from 'node-cache';

// Cache images for 24 hours to stay well within Unsplash rate limits
const cache = new NodeCache({ stdTTL: 86400 });

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const getDestinationImage = async (query) => {
  if (!UNSPLASH_KEY) return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'; // fallback

  const cacheKey = `unsplash_${query.toLowerCase()}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query, per_page: 1, orientation: 'landscape' },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    });

    if (response.data.results.length > 0) {
      const imageUrl = response.data.results[0].urls.regular;
      cache.set(cacheKey, imageUrl);
      return imageUrl;
    }
    return null;
  } catch (error) {
    console.error('Unsplash API Error:', error.message);
    return null;
  }
};
