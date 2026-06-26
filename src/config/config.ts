import dotenv from 'dotenv';

dotenv.config();

const apiBaseUrl = process.env['BASE_URL'];
const apiKey = process.env['WEATHER_API_KEY'];

if (!apiKey) {
  throw new Error('Missing WEATHER_API_KEY environment variable.');
}

export const config = {
  weatherApiBaseUrl: apiBaseUrl,
  weatherApiKey: apiKey,
  forecastDays: 4,
};
