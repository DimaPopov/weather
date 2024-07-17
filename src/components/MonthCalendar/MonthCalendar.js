import React, {useMemo} from "react";

import {
  CalendarComponent,
  CalendarDay,
  CalendarDayHeader,
  CalendarDayNumber,
  CalendarDayWeather,
  CalendarRow
} from "./styled.js";

import {useModal} from "../../utils/ModalProvider/";

import {getWeeks, isSameMonth} from "../../utils/";
import {addDays, getDecade} from "../../utils/calendar";
import {sumArray} from "@vkontakte/vkjs";


export const MonthCalendar = ({
  year = 1,
  month = 1,
  showDecade = false,
  ...restProps
}) => {
  const viewDate = new Date(year, month - 1, 1);
  const weeks = useMemo(() => getWeeks(viewDate), [viewDate]);

  const { modal } = useModal();
  const weather = modal?.weather?.[month];

  return (
    <CalendarComponent {...restProps}>
      <CalendarRow>
        <CalendarDayHeader>Пн</CalendarDayHeader>
        <CalendarDayHeader>Вт</CalendarDayHeader>
        <CalendarDayHeader>Ср</CalendarDayHeader>
        <CalendarDayHeader>Чт</CalendarDayHeader>
        <CalendarDayHeader>Пт</CalendarDayHeader>
        <CalendarDayHeader>Сб</CalendarDayHeader>
        <CalendarDayHeader>Вс</CalendarDayHeader>
      </CalendarRow>

      {weeks.map((week, i) => (
        <CalendarRow key={i}>
          {week.map((day) => {
            const sameMonth = isSameMonth(day, viewDate);
            if (!sameMonth) return <CalendarDay key={day.toISOString()}/>;

            const decade = getDecade(day);

            const isRightBorderDecade = getDecade(day, 1) !== decade || !isSameMonth(addDays(day, 1), viewDate);
            const isLeftBorderDecade = getDecade(day, -1) !== decade;

            return (
              <CalendarDay
                key={day.toISOString()}
                data-decade={decade}
                $showBackground={showDecade}
                $isLeftBorderDecade={isLeftBorderDecade}
                $isRightBorderDecade={isRightBorderDecade}
              >
                <CalendarDayNumber>{day.getDate()}</CalendarDayNumber>
                <CalendarDayWeather>{weather?.[day.getDate()]}°</CalendarDayWeather>
              </CalendarDay>
            );
          })}
        </CalendarRow>
      ))}
    </CalendarComponent>
  );
};
