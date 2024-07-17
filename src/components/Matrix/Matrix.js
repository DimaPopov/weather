import {MatrixContainer, MatrixItem} from "./styled.js";
import {isArray} from "@vkontakte/vkjs";

export const Matrix = ({ matrix }) => {
  const rowLength = matrix?.[0]?.length ?? 1;

  return (
    <MatrixContainer $rowLength={rowLength}>
      {matrix.map((row, i) => {
        if (isArray(row)) {
          return row.map((item, j) => <MatrixItem key={`r-${i}-${j}`}>{roundItem(item)}</MatrixItem>)
        }else {
          return <MatrixItem key={`r-${i}`}>{roundItem(row)}</MatrixItem>;
        }
      })}
    </MatrixContainer>
  );
};

export const roundItem = (num) => {
  return Number(num.toFixed(3));
};
