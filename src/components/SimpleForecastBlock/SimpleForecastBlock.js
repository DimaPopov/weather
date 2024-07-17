import React, {useEffect, useMemo} from "react";
import {CardScroll, Header, Spinner} from "@vkontakte/vkui";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

import {Month} from "../../utils/";
import {useModal} from "../../utils/ModalProvider/";

import {ForecastCard} from "../ForecastCard/ForecastCard";

import {SimpleForecast} from "../../lib/SimpleForecast";


export const SimpleForecastBlock = ({ weather, setStatus, checkForecast }) => {
  const {setModal} = useModal();
  const routeNavigator = useRouteNavigator();

  const forecast = useMemo(() => SimpleForecast(weather), [Object.values(weather)]);

  useEffect(() => {
    setStatus(true);
    checkForecast();
  }, [forecast]);

  return (
    <React.Fragment>
      <Header mode="secondary">Упрощенный прогноз</Header>

      {Object.keys(forecast).length > 0 && <CardScroll size={false}>
        {Object.values(Month).map((month, _month) => (
          <ForecastCard
            key={month}
            month={_month}
            forecast={forecast[_month + 1]}
            onClick={() => {
              setModal({
                month: _month,
                forecast: forecast[_month + 1]
              });
              routeNavigator.showModal("simple-forecast-info");
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
