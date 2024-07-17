import styled from "styled-components";

export const COLORS = ['--blue', '--red', '--green', '--gray', '--orange', '--green_alt', '--purple', '--pink', '--violet', '--black'];

export const MathText = styled.div`
  font-family: "JetBrains Mono", monospace;

  sup {
    font-size: calc(var(--vkui--font_subhead--font_size--compact) - 2px);
  }
`;

export const MathSqrt = styled.span`
  margin-left: 20px;
  border-top: 1px solid var(--vkui--color_text_primary);
  position: relative;
  padding-right: 5px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -6px;
    left: -15px;
    width: 8px;
    height: 20px;
    border-right: 1px solid var(--vkui--color_text_primary);
    border-bottom: 1px solid var(--vkui--color_text_primary);
    transform: rotate(46deg);
    margin-right: 5px;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    height: 5px;
    border-right: 1px solid var(--vkui--color_text_primary);
  }
`;
