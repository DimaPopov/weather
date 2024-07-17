import styled from "styled-components";
import {MathText} from "../../utils/styled.js";

export const MatrixBlock = styled.div`
  display: inline-flex;
  align-items: center;

  column-gap: 20px;
`;

export const MatrixLabel = styled(MathText)`
  font-size: var(--vkui--font_text--font_size--compact);
  line-height: var(--vkui--font_text--line_height--compact);

  &:first-child:not(:last-child):after {
    content: '=';
    margin-left: 20px;
  }
`;

export const MathRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  overflow: auto;
`;

