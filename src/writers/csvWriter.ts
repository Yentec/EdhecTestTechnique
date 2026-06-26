import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { format } from '@fast-csv/format';

import type { Forecast } from '@/models/forecast.js';

const OUTPUT_DIRECTORY = path.join(process.cwd(), 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIRECTORY, 'forecast.csv');

export async function writeForecastCsv(forecasts: Forecast[]): Promise<void> {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });

  return new Promise((resolve, reject) => {
    if (forecasts.length === 0) {
      return resolve();
    }

    const writeStream = createWriteStream(OUTPUT_FILE);
    writeStream.write('\uFEFF');

    const csvStream = format({
      headers: ['Date', 'Weather', 'Average temperature (°C)'],
      delimiter: ';',
    });

    csvStream.pipe(writeStream).on('finish', resolve).on('error', reject);

    forecasts.forEach((forecast) => {
      csvStream.write([
        forecast.date,
        forecast.condition,
        forecast.averageTemperature,
      ]);
    });

    csvStream.end();
  });
}
