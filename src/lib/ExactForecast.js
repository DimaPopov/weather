import {avgTemperature} from "./avgTemperature.js";
import {Forecast} from "./Forecast.js";

export const ExactForecast = (weather) => {
  if (!weather || Object.keys(weather).length < 10) return [];

  const forecasts = {};

  for (let month = 1; month <= 12; month++) {
    const forecast = [[], [], []];
    const avg = [{}, {}, {}];

    Object.keys(weather).forEach((year) => {
      for (let i = 0; i < 4; i++) {
        const shiftMonth = getShiftMonth(month, i);
        const avg_year = avgTemperature(weather[year][shiftMonth]);

        if (!avg[0][year]) avg[0][year] = {};
        avg[0][year][shiftMonth] = avg_year[0];

        if (!avg[1][year]) avg[1][year] = {};
        avg[1][year][shiftMonth] = avg_year[1];

        if (!avg[2][year]) avg[2][year] = {};
        avg[2][year][shiftMonth] = avg_year[2];
      }
    });

    const monthList = Array.from({ length: 4 }).map((_, i) => getShiftMonth(month, 3 - i));

    for (let decade = 0; decade < 3; decade++) {
      const decade_2 = decade + 1 >= 3 ? 0 : decade + 1;
      const month_2 = monthList[decade + 1 >= 3 ? 1 : 0];

      const d1 = getWeatherByMonth(avg[decade], monthList[0]);
      const d2 = getWeatherByMonth(avg[decade_2], month_2);

      forecast[decade].push(Forecast(
        { month: monthList[0], decade: decade },
        { month: month_2, decade: decade_2 },
        d1,
        d2
      ));


      monthList.forEach((monthCalc) => {
        for (let i = 0; i < 3; i++) {
          if (monthCalc === monthList[0] && i < decade + 1) continue;
          if (monthCalc === month && i > decade) continue;

          const pastForecast = forecast[decade][forecast[decade].length - 1];
          const pastMonth = pastForecast?.argument?.month_2;

          if (pastMonth.month === monthCalc && pastMonth.decade === i) continue;

          const d1 = getWeatherByMonth(avg[pastMonth?.decade], pastMonth?.month);
          const d2 = getWeatherByMonth(avg[i], monthCalc);

          forecast[decade].push(Forecast(
            pastMonth,
            { month: monthCalc, decade: i },
            d1,
            d2,
            monthCalc === month && i === decade ? 5 : 4,
            pastForecast.P_V
          ));
        }
      });
    }

    forecasts[month] = [0, 1, 2].map(i => (
      { calc: forecast[i], forecast: forecast[i][forecast[i].length - 1] }
    ));
  }

  return forecasts;
};

const getShiftMonth = (month, shift) => {
  let start_month = month - shift;

  if (start_month < 1) start_month = 12 + start_month;
  if (start_month > 12) start_month = 12 - start_month;

  return start_month;
};

const getWeatherByMonth = (weather, month) => {
  const weatherByMonth = {};

  Object.keys(weather).forEach((year) => {
    weatherByMonth[year] = weather[year][month];
  });

  return weatherByMonth;
}
