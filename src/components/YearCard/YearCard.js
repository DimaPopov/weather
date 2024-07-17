import {YearCardComponent, YearCardSubtitle} from "./styled.js";
import {Title} from "@vkontakte/vkui";

export const YearCard = ({ children, ...restProps }) => {
  return (
    <YearCardComponent {...restProps}>
      <Title level={3}>{children}</Title>
      <YearCardSubtitle>год</YearCardSubtitle>
    </YearCardComponent>
  );
};
