import styled from "styled-components";

export const InfoMonth = styled.div`
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 12px 12px;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 6px;
  }
`;

export const InfoMonthDecade = styled.div`
`;

export const InfoMonthSetting = styled.div`
`;

export const InfoMonthDecadeIn = styled.div`
  display: flex;
  padding-left: var(--vkui--size_base_padding_horizontal--regular);
  padding-right: var(--vkui--size_base_padding_horizontal--regular);

  & > span {
    flex: 1;
  }
`;
