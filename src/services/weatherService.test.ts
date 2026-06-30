import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: getMock,
    }),
    isAxiosError: (error: unknown) =>
      typeof error === 'object' && error !== null && 'isAxiosError' in error,
  },
}));

import { config } from '@/config/config.js';
import type { WeatherApiForecastDay } from '@/models/weatherApi.js';

import { getForecast, mapForecast } from './weatherService.js';

describe('mapForecast', () => {
  it('should map Weather API forecast days into Forecast objects', () => {
    const apiForecast: WeatherApiForecastDay[] = [
      {
        date: '2026-06-30',
        day: {
          avgtemp_c: 21.5,
          condition: {
            text: 'Sunny',
          },
        },
      },
      {
        date: '2026-07-01',
        day: {
          avgtemp_c: 19,
          condition: {
            text: 'Cloudy',
          },
        },
      },
    ];

    expect(mapForecast(apiForecast)).toEqual([
      {
        date: '2026-06-30',
        condition: 'Sunny',
        averageTemperature: 21.5,
      },
      {
        date: '2026-07-01',
        condition: 'Cloudy',
        averageTemperature: 19,
      },
    ]);
  });

  it('should return an empty array when no forecast days are provided', () => {
    expect(mapForecast([])).toEqual([]);
  });
});

describe('getForecast', () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  it('should fetch and map the forecast', async () => {
    getMock.mockResolvedValue({
      data: {
        forecast: {
          forecastday: [
            {
              date: '2026-06-30',
              day: {
                avgtemp_c: 22,
                condition: {
                  text: 'Sunny',
                },
              },
            },
          ],
        },
      },
    });

    const forecasts = await getForecast('Paris');

    expect(getMock).toHaveBeenCalledWith('/forecast.json', {
      params: {
        key: config.weatherApiKey,
        q: 'Paris',
        days: config.forecastDays,
      },
    });

    expect(forecasts).toEqual([
      {
        date: '2026-06-30',
        condition: 'Sunny',
        averageTemperature: 22,
      },
    ]);
  });
  it.each([
    [400, 'No matching location found.'],
    [401, 'API key is invalid.'],
    [403, 'API key has insufficient permissions.'],
    [404, 'No matching API route found.'],
  ])(
    'should throw the Weather API message for a %i response',
    async (status, message) => {
      getMock.mockRejectedValue({
        isAxiosError: true,
        response: {
          status,
          data: {
            error: {
              message,
            },
          },
        },
      });

      await expect(getForecast('Paris')).rejects.toThrow(
        `Weather API error: ${message}`,
      );
    },
  );
});
