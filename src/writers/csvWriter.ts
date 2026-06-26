import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { createObjectCsvWriter } from 'csv-writer';

import type { Forecast } from '@/models/forecast.js';

const OUTPUT_DIRECTORY = path.join(process.cwd(), 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIRECTORY, 'forecast.csv');

const csvWriter = createObjectCsvWriter({
  path: OUTPUT_FILE,
  header: [
    { id: 'date', title: 'Date' },
    { id: 'condition', title: 'Weather' },
    { id: 'averageTemperature', title: 'Average temperature (°C)' },
  ],
});

export async function writeForecastCsv(forecasts: Forecast[]): Promise<void> {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });

  await csvWriter.writeRecords(forecasts);
}
