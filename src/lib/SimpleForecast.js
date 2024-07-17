import {avgTemperature} from "./avgTemperature.js";
import {Forecast} from "./Forecast.js";

export const SimpleForecast = (weather) => {
  if (!weather || Object.keys(weather).length < 10) return [];

  const forecasts = {};

  for (let month = 1; month <= 12; month++) {
    const month_1 = getStartMonth(month);
    const month_2 = month;

    const avg_1 = [{}, {}, {}];
    const avg_2 = [{}, {}, {}];

    Object.keys(weather).forEach((year) => {
      const weather_1_year = weather[year][month_1];
      const weather_2_year = weather[year][month_2];

      const avg_1_year = avgTemperature(weather_1_year);
      const avg_2_year = avgTemperature(weather_2_year);

      for (let i = 0; i < 3; i++) {
        avg_1[i][year] = avg_1_year[i];
        avg_2[i][year] = avg_2_year[i];
      }
    });

    forecasts[month] = [0, 1, 2].map(i => (
      Forecast({ month: month_1, decade: i }, { month: month_2, decade: i }, avg_1[i], avg_2[i], 5)
    ));
  }

  return forecasts;
};

const getStartMonth = (month) => {
  let start_month = month - 3;
  if (start_month < 1) start_month = 12 + start_month;

  return start_month;
};
