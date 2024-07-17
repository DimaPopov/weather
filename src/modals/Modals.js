import {ModalRoot} from "@vkontakte/vkui";
import {useActiveVkuiLocation, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

import {WeatherYear} from "./WeatherYear/WeatherYear.js";
import {SimpleForecastInfo} from "./SimpleForecastInfo/SimpleForecastInfo.js";
import {ExactForecastInfo} from "./ExactForecastInfo/ExactForecastInfo.js";

export const Modals = () => {
  const routeNavigator = useRouteNavigator();
  const { modal: activeModal } = useActiveVkuiLocation();

  return (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => routeNavigator.hideModal()}
    >
      <WeatherYear id="weather-year" dynamicContentHeight />
      <SimpleForecastInfo id="simple-forecast-info" dynamicContentHeight />
      <ExactForecastInfo id="exact-forecast-info" dynamicContentHeight />
    </ModalRoot>
  );
};
