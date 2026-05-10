import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Standardizing on OpenAI for robust JSON schema responses
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

/**
 * Generate a smart itinerary based on user preferences
 */
export const generateSmartItinerary = async (destination, days, style, budget) => {
  try {
    const prompt = `Create a ${days}-day travel itinerary for ${destination}. 
    Travel style: ${style}. Budget: ${budget}.
    Provide the response strictly as a JSON object with the following structure:
    {
      "trip": "Name of trip",
      "days": [
        {
          "day": 1,
          "city": "City Name",
          "activities": [
            { "title": "Activity 1", "type": "sightseeing", "duration": "2h", "estimated_cost": 20 }
          ]
        }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('AI Itinerary Error:', error);
    throw new Error('Failed to generate smart itinerary');
  }
};

/**
 * Estimate local costs for a destination
 */
export const estimateBudget = async (destination, duration_days) => {
  try {
    const prompt = `Estimate the daily budget for a traveler in ${destination} for ${duration_days} days.
    Return strictly as JSON:
    {
      "daily_food": 50,
      "daily_transport": 20,
      "daily_accommodation": 100,
      "total_estimated": 850
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('AI Budget Error:', error);
    return null;
  }
};
