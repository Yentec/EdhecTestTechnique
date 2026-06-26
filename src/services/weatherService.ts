import axios from 'axios';

import { config } from '@/config/config.js';
import type { Forecast } from '@/models/forecast.js';
import type { WeatherApiResponse } from '@/models/weatherApi.js';

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

    return response.data.forecast.forecastday.map((forecastDay) => ({
      date: forecastDay.date,
      condition: forecastDay.day.condition.text,
      averageTemperature: forecastDay.day.avgtemp_c,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        const message = error.response?.data?.error?.message ?? error.message;

        throw new Error(`Weather API error: ${message}`);
      }

      throw new Error(`Weather API request failed: ${error.message}`);
    }

    throw new Error(
      'An unexpected error occurred while fetching the weather forecast.',
    );
  }
}
