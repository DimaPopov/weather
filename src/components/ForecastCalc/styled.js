import styled from "styled-components";
import {Div, Paragraph} from "@vkontakte/vkui";

export const ForecastCalcComponent = styled(Div)`
`;

export const ForecastCalcGraph = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const FlexBlock = styled.div`
  flex: 1;
`;

export const ForecastGraphLegend = styled(Div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const ForecastGraphLegendItem = styled(Paragraph)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 var(--vkui--size_base_padding_horizontal--regular);
  padding-bottom: 10px;
  cursor: pointer;
  transition: opacity .2s ease-in-out;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: inline-block;
    background-color: var(${(props) => props?.$color});
  }

  ${(props) => props?.$hoverGraph ? "opacity: 0.2" : ""};
`;

export const SystemInfo = styled(Div)`
  background-color: var(--vkui--color_background_secondary_alpha);
  color: var(--vkui--color_text_secondary);
  border-radius: var(--vkui--size_border_radius--regular);
  max-height: 350px;
  overflow: auto;
  font-family: "JetBrains Mono", monospace;
`;
