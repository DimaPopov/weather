import dayjs from 'dayjs';
import {isNumber} from "@vkontakte/vkjs";

export const getWeeks = (viewDate, weekStartsOn = 1) => {
  const start = startOfWeek(startOfMonth(viewDate), weekStartsOn);
  const end = endOfWeek(endOfMonth(viewDate), weekStartsOn);

  let count = 0;
  let current = start;
  const nestedWeeks = [];
  let lastDay = null;

  while (isBefore(current, end)) {
    const weekNumber = Math.floor(count / 7);
    nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];

    const day = current.getDay();

    if (lastDay !== day) {
      lastDay = day;
      nestedWeeks[weekNumber].push(current);
      count += 1;
    }

    current = addDays(current, 1);
  }

  return nestedWeeks;
};

export const startOfWeek = (date, weekStart = 0) => {
  weekStart = weekStart % 7;

  const day = dayjs(date);
  const weekDay = day.day();
  const diff = (weekDay < weekStart ? 7 : 0) + weekDay - weekStart;

  return day.date(day.date() - diff).toDate();
}

export const endOfWeek = (date, weekStart = 0) => {
  const day = dayjs(startOfWeek(date, weekStart));

  return day.date(day.date() + 6).toDate();
}

export const startOfMonth = (date) => {
  return dayjs(date).startOf('month').toDate();
}

export const endOfMonth = (date) => {
  return dayjs(date).endOf('month').toDate();
}

export const isBefore = (date1, date2) => {
  // Exactly as date-fns does
  // dayjs().isBefore() for slightly different approach
  return dayjs(date1) < dayjs(date2);
}

export const addDays = (date, day) => {
  return dayjs(date).add(day, 'day').toDate();
}

export const isSameMonth = (date1, date2) => {
  return dayjs(date1).isSame(date2, 'month');
}

export const getDecade = (date, shift = 0) => {
  const day = isNumber(date) ? date + shift : date.getDate() + shift;

  if (day < 1 || day > 31) return 0;

  if (day >= 1 && day <= 10) return 1;
  if (day >= 11 && day <= 20) return 2;

  return 3;
};
