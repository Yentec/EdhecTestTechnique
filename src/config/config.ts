import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env['WEATHER_API_KEY'];

if (!apiKey) {
  throw new Error('Missing WEATHER_API_KEY environment variable.');
}

export const config = {
  weatherApiKey: apiKey,
};
