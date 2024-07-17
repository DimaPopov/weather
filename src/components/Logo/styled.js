import styled from "styled-components";

export const LogoComponent = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
  padding: var(--vkui--size_base_padding_horizontal--regular) var(--vkui--size_base_padding_vertical--regular);
  color: var(--vkui--color_text_primary);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const LogoTitle = styled.div`
  font-family: var(--vkui--font_family_accent);
  font-weight: 500;
  font-size: 21px;
  line-height: 1;
`;
