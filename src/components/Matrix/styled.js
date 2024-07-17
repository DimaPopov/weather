import styled from "styled-components";

import {MathText} from "../../utils/styled.js";

export const MatrixContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props?.$rowLength}, 1fr);
  gap: 15px;
  width: 100%;
  height: 100%;
  border: 1px solid var(--vkui--color_text_primary);
  padding: 10px;
  box-sizing: border-box;

  &:before, &:after {
    content: '';
    display: block;
    position: absolute;
    width: 85%;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    background-color: var(--vkui--color_background_content);
  }

  &:before {
    top: -1px;
  }

  &:after {
    bottom: -1px;
  }
`;

export const MatrixItem = styled(MathText)`
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: var(--vkui--font_paragraph--font_size--regular);
  font-weight: var(--vkui--font_paragraph--font_weight--regular);
  line-height: var(--vkui--font_paragraph--line_height--regular);
`;
