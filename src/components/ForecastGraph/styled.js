import styled from "styled-components";

export const ForecastGraphComponent = styled.div`
  height: 470px;

  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;

export const GraphComponent = styled.div`
  &, svg {
    width: 100%;
    height: 100%;
  }

  svg path[id^="way"] {
    cursor: pointer;
    transition: opacity .2s ease-in-out;
  }
`;
