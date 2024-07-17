import React, {useEffect, useState} from "react";
import {
  Group, Header,
  HorizontalScroll,
  Placeholder,
  Progress,
} from "@vkontakte/vkui";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

import {YearCard} from "../YearCard/YearCard.js";

import {Month, getWeather, getLocalKeyWeather} from "../../utils/";
import {useModal} from "../../utils/ModalProvider/";

export const WeatherBlock = ({ city, weather, setWeather }) => {
  const routeNavigator = useRouteNavigator();

  const [isProcess, setIsProcess] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);

  const [localWeather, setLocalWeather] = useState([]);

  const { setModal } = useModal();

  const today = new Date();
  const todayYear = today.getFullYear();

  useEffect(() => {
    if (isProcess) return;
    setIsProcess(true);

    requestWeather(10, 1);
  }, [city]);

  const requestWeather = (year, month, skipLoader = false) => {
    const dateYear = todayYear - year;
    if (!skipLoader) setActiveRequest({ year: dateYear, month: month });

    getWeather(city, dateYear, month)
      .then((data) => {
        const newWeather = Object.assign(localWeather);

        if (!newWeather[dateYear]) newWeather[dateYear] = [];
        newWeather[dateYear][month] = data;
        setLocalWeather(newWeather);

        if (year === 1 && month === 12) {
          setWeather(newWeather);
          setActiveRequest(null);
          setIsProcess(false);
          return;
        }

        if (month === 12) {
          year--;
          month = 1;
        }else {
          month++;
        }

        if (localStorage.getItem(getLocalKeyWeather(city, dateYear, month))) requestWeather(year, month, true);
        else setTimeout(() => requestWeather(year, month), 600);
      });
  };

  const weatherYears = Object.keys(localWeather);
  const countRequest = weatherYears.length ? (weatherYears.length - 1) * 12 + activeRequest?.month : activeRequest?.month ?? -1;

  return (
    <Group>
      {isProcess && <Placeholder style={{ height: 300 }}>
        {activeRequest ? `Получаем погоду за ${Month[activeRequest.month].toLowerCase()} ${activeRequest.year}...` : "Получаем архив погоды..."}
        {countRequest >= 0 && <Progress style={{ width: 250, marginTop: 10 }} height={5} value={countRequest / 120 * 100}/>}
      </Placeholder>}

      {!isProcess && <React.Fragment>
        <Header mode="secondary">Архив погоды</Header>
        <HorizontalScroll
          showArrows
          inline
        >
          {weatherYears.map((year) =>
            <YearCard
              key={year}
              onClick={() => {
                setModal({ year: year, weather: weather[year] });
                routeNavigator.showModal("weather-year");
              }}
            >
              {year}
            </YearCard>
          )}
        </HorizontalScroll>
      </React.Fragment>}
    </Group>
  );
};
