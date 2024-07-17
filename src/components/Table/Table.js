import styled from "styled-components";

export const TableContainer = styled.div`
  overflow: auto;
  border: 1px solid rgb(225, 227, 230);
  border-radius: 8px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  border: none;
  width: 100%;
`;

export const Thead = styled.thead`
  border-bottom: 1px solid var(--vkui--color_separator_secondary);
  background-color: var(--vkui--color_background_tertiary);
  font-style: normal;
  font-size: var(--vkui--font_paragraph--font_size--regular);
  font-weight: var(--vkui--font_paragraph--font_weight--regular);
  line-height: var(--vkui--font_paragraph--line_height--regular);

  &:last-child {
    border-bottom: none;
  }
`;

export const Tbody = styled.tbody`
  background-color: var(--vkui--color_background_content);
`;

export const Tr = styled.tr`
  &:last-child {
    border-bottom: none;
  }

  border-bottom: 1px solid var(--vkui--color_separator_secondary);
`;

export const Th = styled.th`
  padding: 16px 8px;
  text-align: left;
  color: var(--vkui--color_text_subhead);
  font-size: var(--vkui--font_paragraph--font_size--regular);
  line-height: var(--vkui--font_paragraph--line_height--regular);
  border: none;
  vertical-align: top;
  white-space: pre-wrap;
`;

export const Td = styled.td`
  padding: 12px 8px;
  font-size: var(--vkui--font_paragraph--font_size--regular);
  font-weight: var(--vkui--font_paragraph--font_weight--regular);
  line-height: var(--vkui--font_paragraph--line_height--regular);
  border: none;
  vertical-align: top;
  white-space: pre-wrap;
`;
