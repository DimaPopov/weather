import {divideRanges, rangeToAdjustObject} from "./ranges";
import {multiplyMatrixByVector, transposeMatrix} from "./matrix";

export const Forecast = (month_1, month_2, d1, d2, r2 = 4, V = [0, 1, 0, 0]) => {
  const s1 = divideRanges(d1);
  const s2 = divideRanges(d2, r2);

  const way = [];
  const P = [];

  s1.map((range_1, i) => {
    const years = Object.keys(range_1);
    const countYears = years.length;

    const row = [];

    years.map((year) => {
      s2.map((range_2, j) => {
        if (!row[j]) row[j] = [];
        if (Object.keys(range_2).includes(year)) row[j].push(year);
      });
    });

    way[i] = row;
    P[i] = row.map((item) => item.length / countYears);
  });

  const P_T = transposeMatrix(P);
  const P_V = multiplyMatrixByVector(P_T, V);

  const avg_d2_range = rangeToAdjustObject(s2).map((range) => (range.min + range.max) / 2);

  let result = 0;
  P_V.map((a, i) => result += a * avg_d2_range[i]);

  let D = 0;
  P_V.map((a, i) => D += a * avg_d2_range[i] ** 2);
  D -= result ** 2;

  const inaccuracy = Math.sqrt(D);

  return {
    argument: {
      month_1: month_1,
      month_2: month_2,
      d1: d1,
      d2: d2,
      r2: r2,
      V: V
    },
    range: {
      s1: s1,
      s2: s2
    },
    way: way,
    P: P,
    P_T: P_T,
    V: V,
    P_V: P_V,
    avg_range: avg_d2_range,
    temperature: result,
    inaccuracy: inaccuracy,
    D: D
  };
};
