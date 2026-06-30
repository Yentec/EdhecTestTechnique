import { afterEach, describe, expect, it } from 'vitest';

import { promises as fs } from 'node:fs';
import path from 'node:path';

import { writeForecastCsv } from '@/writers/csvWriter.js';

describe('writeForecastCsv', () => {
  const testDirectory = path.join(process.cwd(), 'test-output');
  const outputFile = path.join(testDirectory, 'forecast.csv');

  afterEach(async () => {
    await fs.rm(testDirectory, {
      recursive: true,
      force: true,
    });
  });

  it('should create a CSV file containing the forecast data', async () => {
    await writeForecastCsv(
      [
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
      ],
      outputFile,
    );

    const content = await fs.readFile(outputFile, 'utf8');

    expect(content.startsWith('\uFEFF')).toBe(true);

    expect(content).toContain('Date;Weather;Average temperature (°C)');

    expect(content).toContain('2026-06-30;Sunny;21.5');

    expect(content).toContain('2026-07-01;Cloudy;19');
  });
  it('should not create a CSV file when no forecasts are provided', async () => {
    await writeForecastCsv([], outputFile);

    await expect(fs.access(outputFile)).rejects.toThrow();
  });
});
