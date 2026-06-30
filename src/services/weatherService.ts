import axios from 'axios';

import { config } from '@/config/config.js';
import type { Forecast } from '@/models/forecast.js';
import type {
  WeatherApiForecastDay,
  WeatherApiResponse,
} from '@/models/weatherApi.js';

const client = axios.create({
  baseURL: config.weatherApiBaseUrl,
  timeout: 5000,
});

export async function getForecast(city: string): Promise<Forecast[]> {
  try {
    const response = await client.get<WeatherApiResponse>('/forecast.json', {
      params: {
        key: config.weatherApiKey,
        q: city,
        days: config.forecastDays,
      },
    });

    return mapForecast(response.data.forecast.forecastday);
  } catch (error) {
    handleWeatherApiError(error);
  }
}

export function mapForecast(forecastDays: WeatherApiForecastDay[]): Forecast[] {
  return forecastDays.map((forecastDay) => ({
    date: forecastDay.date,
    condition: forecastDay.day.condition.text,
    averageTemperature: forecastDay.day.avgtemp_c,
  }));
}

function handleWeatherApiError(error: unknown): never {
  if (!axios.isAxiosError(error)) {
    throw new Error(
      'An unexpected error occurred while fetching the weather forecast.',
    );
  }

  const apiMessage = error.response?.data?.error?.message ?? error.message;

  throw new Error(`Weather API error: ${apiMessage}`);
}
