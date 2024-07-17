import styled from "styled-components";
import {Card, Header, Tappable} from "@vkontakte/vkui";

export const ForecastCardComponent = styled(Card).attrs({
  mode: "outline"
})`
`;

export const ForecastCardIn = styled(Tappable)`
  padding: 15px 20px;
`;

export const ForecastCardTitle = styled(Header).attrs({
  mode: "secondary"
})`
  padding: 0;
  margin-bottom: 10px;

  h2 {
    margin: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ForecastCardTemperatures = styled.div`
  display: flex;
  column-gap: 30px;
`;

export const ForecastCardTemperature = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ForecastCardDecade = styled.div`
  font-size: 14px;
  color: var(--vkui--color_text_subhead);
`;

export const ForecastCardValue = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const ForecastCardInaccuracy = styled.span`
  font-size: 12px;
  color: var(--vkui--color_text_secondary);
  margin-left: 8px;
`;
