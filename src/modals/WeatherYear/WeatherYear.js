import {useEffect, useLayoutEffect, useMemo, useState} from "react";

import {
  Button,
  Card,
  Checkbox, Header,
  HorizontalScroll, InfoRow, MiniInfoCell,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Tabs,
  TabsItem, useModalRootContext
} from "@vkontakte/vkui";
import {Icon24Dismiss} from "@vkontakte/icons";
import {useRouteNavigator, useSearchParams} from "@vkontakte/vk-mini-apps-router";

import {useModal} from "../../utils/ModalProvider/";
import {avgTemperature, Month, MonthEN} from "../../utils/";

import {MonthCalendar} from "../../components/MonthCalendar/MonthCalendar.js";

import {InfoMonth, InfoMonthDecade, InfoMonthDecadeIn, InfoMonthSetting} from "./styled.js";


export const WeatherYear = () => {
  const [params] = useSearchParams();

  const routeNavigator = useRouteNavigator();
  const { modal } = useModal();

  const [activeMonth, setActiveMonth] = useState(1);
  const [showDecade, setShowDecade] = useState(false);

  const { updateModalHeight } = useModalRootContext();
  useEffect(updateModalHeight, [activeMonth]);

  const weather = modal?.weather?.[activeMonth];
  const temperatureDecade = useMemo(() => avgTemperature(weather), [weather]);

  return (
    <ModalPage
      id="weather-year"
      size={800}
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
          {modal?.year} год
        </ModalPageHeader>
      }
    >
      <HorizontalScroll>
        <Tabs>
          {Object.keys(modal?.weather ?? []).map((month) => (
            <TabsItem
              key={month}
              selected={Number(month) === activeMonth}
              onClick={() => setActiveMonth(Number(month))}
            >
              {Month[month].slice(0, 3)}
            </TabsItem>
          ))}
        </Tabs>
      </HorizontalScroll>

      <Card style={{ margin: 12, padding: "12px 6px 6px" }}>
        <MonthCalendar year={modal?.year} month={activeMonth} showDecade={showDecade}/>
      </Card>

      <InfoMonth>
        <InfoMonthDecade>
          <Header mode="secondary">Средняя температура декад</Header>

          <InfoMonthDecadeIn>
            <InfoRow header="I декада">{temperatureDecade[0]}°</InfoRow>
            <InfoRow header="II декада">{temperatureDecade[1]}°</InfoRow>
            <InfoRow header="III декада">{temperatureDecade[2]}°</InfoRow>
          </InfoMonthDecadeIn>
        </InfoMonthDecade>

        <InfoMonthSetting>
          <Checkbox
            onChange={(e) => setShowDecade(e.target.checked)}
          >
            Показать декады
          </Checkbox>

          <div style={{ margin: 6 }}>
            <Button
              mode="secondary"
              href={`https://pogoda.mail.ru/prognoz/${params.get("city")}/${MonthEN[activeMonth]}-${modal?.year}/`}
              target="_blank"
              rel="noopener noreferrer"
              stretched
            >
              Посмотреть в Погода Mail.ru
            </Button>
          </div>
        </InfoMonthSetting>
      </InfoMonth>
    </ModalPage>
  );
};
