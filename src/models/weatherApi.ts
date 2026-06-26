export interface WeatherApiResponse {
  forecast: {
    forecastday: WeatherApiForecastDay[];
  };
}

export interface WeatherApiForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      text: string;
    };
  };
}
