import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export const config = {
  weatherApiBaseUrl: getEnv('BASE_URL'),
  weatherApiKey: getEnv('WEATHER_API_KEY'),
  forecastDays: 4,
};
