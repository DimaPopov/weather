import styled from "styled-components";
import {Tappable, Text} from "@vkontakte/vkui";

export const YearCardComponent = styled(Tappable)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 15px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const YearCardSubtitle = styled(Text)`
  color: var(--vkui--color_text_secondary);
`;
