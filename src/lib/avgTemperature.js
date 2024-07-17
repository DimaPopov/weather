import {getDecade} from "../utils/calendar.js";
import {sumArray} from "@vkontakte/vkjs";

export const avgTemperature = (weather) => {
  const temperature = [[], [] , []];

  Object.keys(weather).map((day) => {
    const decade = getDecade(Number(day));
    temperature[decade - 1].push(weather?.[day]);
  });

  return [
    avg(temperature[0]),
    avg(temperature[1]),
    avg(temperature[2])
  ];
};

export const avgRange = (range) => {
  const values = Object.values(range);

  const min = Math.floor(Math.min(...values));
  const max = Math.ceil(Math.min(...values));

  let sum = 0;
  let count = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
    count++;
  }

  return sum / count;
};

export const avg = (array) => Number((sumArray(array) / array.length).toFixed(2));
