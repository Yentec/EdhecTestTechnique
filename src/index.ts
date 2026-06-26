import { getForecast } from '@/services/weatherService.js';
import { writeForecastCsv } from '@/writers/csvWriter.js';

async function main() {
  const city = process.argv.slice(2).join(' ');

  if (!city) {
    console.error('Usage: npm start <city>');
    process.exit(1);
  }

  try {
    console.log(`Fetching weather forecast for "${city}"...`);

    const forecasts = await getForecast(city);

    if (forecasts.length === 0) {
      console.log('No forecast data available.');
      process.exit(0);
    }

    await writeForecastCsv(forecasts);

    console.log('Forecast successfully written to output/forecast.csv');

    process.exit(0);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';

    console.error('Error:', message);

    process.exit(1);
  }
}

main();
