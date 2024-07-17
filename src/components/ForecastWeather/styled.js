import styled from "styled-components";
import {Div} from "@vkontakte/vkui";
import {Td, Th} from "../Table/Table.js";

export const ForecastWeatherComponent = styled(Div)`
  ${Th}, ${Td} {
    text-align: center;
  }

  ${Td} {
    font-family: "JetBrains Mono", monospace;
  }

  &:not(:first-child) {
    padding-top: 0;
  }
`;
