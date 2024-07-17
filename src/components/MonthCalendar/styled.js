import styled from "styled-components";
import {Card, Text} from "@vkontakte/vkui";

export const CalendarComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
`;

export const CalendarRow = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const CalendarDayHeader = styled(Text)`
  align-items: center;
  color: var(--vkui--color_text_subhead);
  display: flex;
  flex-basis: calc(100% / 7);
  flex-grow: 0;
  height: 32px;
  justify-content: center;
  text-transform: capitalize;
`;

export const CalendarDay = styled.div`
  flex-basis: calc(100% / 7);
  flex-grow: 0;
  height: 50px;
  padding: 10px;
  text-align: center;
  transition: background-color .2s ease-in-out;

  &[data-decade="1"] {
    background-color: ${(props) => props?.$showBackground ? "rgba(2,123,243,.08)" : ""};
  }

  &[data-decade="2"] {
    background-color: ${(props) => props?.$showBackground ? "rgba(255,136,0,.15)" : ""};
  }

  &[data-decade="3"] {
    background-color: ${(props) => props?.$showBackground ? "rgba(50, 186, 118, 0.15)" : ""};
  }

  ${(props) => props?.$isLeftBorderDecade ? "border-top-left-radius: 12px; border-bottom-left-radius: 12px;" : ""};
  ${(props) => props?.$isRightBorderDecade ? "border-top-right-radius: 12px; border-bottom-right-radius: 12px;" : ""};

  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export const CalendarDayNumber = styled(Text)`
  color: var(--vkui--color_text_primary);
  font-family: var(--vkui--font_family_base);
  font-weight: 500;
  font-size: 16px;
  margin: 5px 0;
`;

export const CalendarDayWeather = styled(Text)`
  color: var(--vkui--color_text_secondary);
  font-family: var(--vkui--font_family_base);
  font-size: 14px;
`;
