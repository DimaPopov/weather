import React, {useEffect, useState} from "react";

import {
  Header,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Tabs,
  TabsItem,
  useModalRootContext
} from "@vkontakte/vkui";
import {Icon24Dismiss} from "@vkontakte/icons";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

import {useModal} from "../../utils/ModalProvider/";
import {decadeText, Month, MonthOf} from "../../utils/index.js";
import {ForecastCalc} from "../../components/ForecastCalc/ForecastCalc.js";

export const ExactForecastInfo = () => {
  const routeNavigator = useRouteNavigator();
  const { modal } = useModal();

  const { month, forecast } = modal ?? { weather: null, month: 0, forecast: null };
  const [decade, setDecade] = useState(1);

  const { updateModalHeight } = useModalRootContext();
  useEffect(updateModalHeight, [decade]);

  const forecastCalc = forecast?.[decade - 1]?.calc ?? [];

  return (
    <ModalPage
      id="exact-forecast-info"
      size={950}
      hideCloseButton
      dynamicContentHeight
      header={
        <ModalPageHeader
          after={
            <PanelHeaderButton onClick={() => routeNavigator.hideModal()}>
              <Icon24Dismiss />
            </PanelHeaderButton>
          }
        >
          {Month[month + 1]}
        </ModalPageHeader>
      }
    >
      <Tabs layoutFillMode="shrinked">
        <TabsItem selected={decade === 1} onClick={() => setDecade(1)}>I декада</TabsItem>
        <TabsItem selected={decade === 2} onClick={() => setDecade(2)}>II декада</TabsItem>
        <TabsItem selected={decade === 3} onClick={() => setDecade(3)}>III декада</TabsItem>
      </Tabs>

      {forecastCalc.map((forecastDecade, i) => (
        <React.Fragment>
          <Header>
            {`${decadeText[forecastDecade?.argument?.month_1?.decade]} декада ${MonthOf[forecastDecade?.argument?.month_1?.month].toLowerCase()} → `}
            {`${decadeText[forecastDecade?.argument?.month_2?.decade]} декада ${MonthOf[forecastDecade?.argument?.month_2?.month].toLowerCase()}`}
          </Header>

          <ForecastCalc
            key={i}
            result={i === forecastCalc.length - 1}
            forecast={forecastDecade}
          />
        </React.Fragment>
      ))}

      {forecastCalc.length === 0 && <ForecastCalc/>}
    </ModalPage>
  );
};
