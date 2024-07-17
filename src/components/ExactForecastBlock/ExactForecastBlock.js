import React, {useEffect, useMemo} from "react";
import {CardScroll, Header, Spinner} from "@vkontakte/vkui";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

import {Month} from "../../utils/";
import {useModal} from "../../utils/ModalProvider/";

import {ForecastCard} from "../ForecastCard/ForecastCard";

import {ExactForecast} from "../../lib/ExactForecast";


export const ExactForecastBlock = ({ weather, setStatus, checkForecast }) => {
  const {setModal} = useModal();
  const routeNavigator = useRouteNavigator();

  const forecast = useMemo(() => ExactForecast(weather), [Object.values(weather)]);

  useEffect(() => {
    setStatus(true);
    checkForecast();
  }, [forecast]);

  return (
    <React.Fragment>
      <Header mode="secondary">Прогноз</Header>

      {Object.keys(forecast).length > 0 && <CardScroll size={false}>
        {Object.values(Month).map((month, _month) => (
          <ForecastCard
            key={month}
            month={_month}
            forecast={forecast[_month + 1].map((item) => item.forecast)}
            onClick={() => {
              setModal({
                month: _month,
                forecast: forecast[_month + 1]
              });
              routeNavigator.showModal("exact-forecast-info");
            }}
          >
            {month}
          </ForecastCard>
        ))}
      </CardScroll>}

      {(!forecast || Object.keys(forecast).length === 0) && <Spinner style={{ height: 100 }}/>}
    </React.Fragment>
  );
};
