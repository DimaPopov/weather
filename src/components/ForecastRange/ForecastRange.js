import {ForecastRangeComponent, ForecastRangeItem, ForecastRangeSubtitle} from "./styled.js";
import {Header} from "@vkontakte/vkui";
import {decadeText, MonthOf} from "../../utils/";

export const ForecastRange = ({ s, decade, month, range }) => {
  return (
    <ForecastRangeComponent>
      <Header mode="tertiary">
        S{s}
        <ForecastRangeSubtitle>{decadeText[decade]} декада {MonthOf[month].toLowerCase()}</ForecastRangeSubtitle>
      </Header>

      {range.map((rangeItem, i) => {
        let left = `[${rangeItem.min}`;
        let right = `${rangeItem.max})`;

        if (i === 0) left = "(-∞";
        if (i === range.length - 1) right = "+∞)";

        return <ForecastRangeItem key={i}>{left}; {right}</ForecastRangeItem>;
      })}
    </ForecastRangeComponent>
  );
};
