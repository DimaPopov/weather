import {useEffect, useState} from "react";

import {ModalPage, ModalPageHeader, PanelHeaderButton, Tabs, TabsItem, useModalRootContext} from "@vkontakte/vkui";
import {Icon24Dismiss} from "@vkontakte/icons";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

import {useModal} from "../../utils/ModalProvider/";
import {Month} from "../../utils/index.js";
import {ForecastCalc} from "../../components/ForecastCalc/ForecastCalc.js";

export const SimpleForecastInfo = () => {
  const routeNavigator = useRouteNavigator();
  const { modal } = useModal();

  const { month, forecast } = modal ?? { weather: null, month: 0, forecast: null };
  const [decade, setDecade] = useState(1);

  const { updateModalHeight } = useModalRootContext();
  useEffect(updateModalHeight, [decade]);

  return (
    <ModalPage
      id="simple-forecast-info"
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

      <ForecastCalc
        result
        forecast={forecast?.[decade - 1]}
      />
    </ModalPage>
  );
};
