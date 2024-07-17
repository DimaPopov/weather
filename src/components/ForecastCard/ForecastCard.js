import {useMemo} from "react";
import {Tooltip} from "@vkontakte/vkui";
import {noop} from "@vkontakte/vkjs";

import {
  ForecastCardComponent,
  ForecastCardDecade, ForecastCardInaccuracy,
  ForecastCardTemperature,
  ForecastCardTemperatures,
  ForecastCardTitle, ForecastCardValue,
  ForecastCardIn
} from "./styled.js";

import {endOfMonth, MonthOf, decadeText} from "../../utils/";


export const ForecastCard = ({ children, month, forecast, onClick = noop, ...restProps }) => {
  const endMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(month);

    return endOfMonth(date);
  }, [month]);

  const textTooltip = (decade, temperature, inaccuracy) => {
    return `В ${decadeText[decade]} декаде ${MonthOf[month + 1].toLowerCase()} ${endMonth.getFullYear()} температура воздуха днем будет в диапозоне от ${Math.ceil(temperature) - Math.ceil(inaccuracy)}° до ${Math.ceil(temperature) + Math.ceil(inaccuracy)}°`;
  };

  return (
    <ForecastCardComponent {...restProps}>
      <ForecastCardIn onClick={onClick}>
        <ForecastCardTitle>{children}</ForecastCardTitle>

        <ForecastCardTemperatures>
          <Tooltip
            placement="bottom-auto"
            appearance="inversion"
            maxWidth={300}
            text={textTooltip(0, forecast[0]?.temperature, forecast[0]?.inaccuracy)}
          >
            <ForecastCardTemperature>
              <ForecastCardDecade>1 - 10</ForecastCardDecade>
              <ForecastCardValue>
                {Math.ceil(forecast[0]?.temperature)}°
                <ForecastCardInaccuracy>± {Math.ceil(forecast[0]?.inaccuracy)}°</ForecastCardInaccuracy>
              </ForecastCardValue>
            </ForecastCardTemperature>
          </Tooltip>

          <Tooltip
            placement="bottom-auto"
            appearance="inversion"
            maxWidth={300}
            text={textTooltip(1, forecast[1]?.temperature, forecast[1]?.inaccuracy)}
          >
            <ForecastCardTemperature>
              <ForecastCardDecade>11 - 20</ForecastCardDecade>
              <ForecastCardValue>
                {Math.ceil(forecast[1]?.temperature)}°
                <ForecastCardInaccuracy>± {Math.ceil(forecast[1]?.inaccuracy)}°</ForecastCardInaccuracy>
              </ForecastCardValue>
            </ForecastCardTemperature>
          </Tooltip>

          <Tooltip
            placement="bottom-auto"
            appearance="inversion"
            maxWidth={300}
            text={textTooltip(2, forecast[2]?.temperature, forecast[2]?.inaccuracy)}
          >
            <ForecastCardTemperature>
              <ForecastCardDecade>21 - {endMonth.getDate()}</ForecastCardDecade>
              <ForecastCardValue>
                {Math.ceil(forecast[2]?.temperature)}°
                <ForecastCardInaccuracy>± {Math.ceil(forecast[2]?.inaccuracy)}°</ForecastCardInaccuracy>
              </ForecastCardValue>
            </ForecastCardTemperature>
          </Tooltip>
        </ForecastCardTemperatures>
      </ForecastCardIn>
    </ForecastCardComponent>
  );
};
