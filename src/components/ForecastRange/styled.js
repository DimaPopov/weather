import styled from "styled-components";
import {MathText} from "../../utils/styled.js";
import {Paragraph} from "@vkontakte/vkui";

export const ForecastRangeComponent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  row-gap: 5px;
`;

export const ForecastRangeSubtitle = styled(Paragraph)`
  display: block;
  opacity: .5;
`;

export const ForecastRangeItem = styled(MathText)`
  font-size: var(--vkui--font_paragraph--font_size--regular);
`;
