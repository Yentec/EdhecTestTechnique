# Weather Forecast CLI

A simple Node.js + TypeScript CLI application that fetches weather forecasts for a given city and exports the result into a CSV file.

---

## Features

- Fetches weather forecast data using WeatherAPI
- Supports next 3–4 days forecast
- Exports results into a CSV file
- Clean CLI interface
- Type-safe implementation with TypeScript
- Separated architecture (service, models, writer)

---

## Tech Stack

- Node.js
- TypeScript
- Axios
- fast-csv
- dotenv

---

## Project Structure

```
src/
├── config/ # Environment configuration
├── models/ # TypeScript types (domain + API)
├── services/ # Weather API logic
├── writers/ # CSV export logic
├── index.ts # CLI entry point
```

---

## Installation

```bash
git clone https://github.com/Yentec/EdhecTestTechnique.git
cd weather-forecast
npm install
```

## Environment variables

Create a `.env` file in the root directory:

```bash
BASE_URL=api_url
WEATHER_API_KEY=your_api_key_here
```

You can copy the example file:

```bash
cp .env.example .env
```

## Usage

Run the CLI with a city name:

```bash
npm run dev Paris
```

Or with multiple words:

```bash
npm run dev "New York"
```

## Build & Run (production mode)

```bash
npm run build
npm start Paris
```

## Output

The generated CSV file will be created here:

`output/forecast.csv`

Example content:

```csv
Date;Weather;Average temperature (°C)
2026-06-26;Patchy rain nearby;32
2026-06-27;Patchy rain nearby;28.8
2026-06-28;Sunny;28.2
2026-06-29;Patchy rain nearby;22.4
```

## Design choices

### Separation of concerns

The project is split into clear layers:

- Service layer → handles WeatherAPI integration
- Domain models → define internal data structures
- Writer layer → handles CSV export
- CLI layer → orchestrates the application

### API isolation

The application does not expose WeatherAPI structures outside the service layer.
This makes it easy to replace the API provider without impacting the rest of the codebase.

### Type safety

All data is fully typed using TypeScript, ensuring:

- safer refactoring
- better maintainability
- clear data contracts between layers

## Possible improvements

- Add unit tests (Jest)
- Add support for multiple output formats (JSON, XML)
- Add caching layer to reduce API calls
- Add interactive CLI mode
