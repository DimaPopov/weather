
export const divideRanges = (data, rangeCount = 4) => {
  const sortedData = Object.entries(data).sort((a, b) => a[1] - b[1]);

  const ranges = [];
  let startIndex = 0;
  let rangeSize = Math.ceil(sortedData.length / rangeCount);

  for (let i = 0; i < rangeCount; i++) {
    let start = startIndex;
    let end = start + rangeSize;

    if (end > sortedData.length) end = sortedData.length;

    // Корректировка для одинаковых значений на границе диапазона
    while (end < sortedData.length && sortedData[end - 1][1] === sortedData[end][1]) {
      end++;
    }

    if (i === rangeCount - 1 && end < sortedData.length) end = sortedData.length;

    const rangeData = sortedData.slice(start, end);
    ranges.push(rangeData);

    startIndex = end;
    rangeSize = Math.ceil((sortedData.length - startIndex) / (rangeCount - i - 1));
  }

  return ranges.map((range) => {
    const rangeObj = {};
    range.forEach(([key, value]) => rangeObj[key] = value);
    return rangeObj;
  });
}


export const adjustRanges = (ranges) => {
  // По возможности округлим границы диапозонов
  const roundRange = ranges.map((range, index) => {
    let min = Math.floor(range.min);
    let max = Math.ceil(range.max);

    // Проверка на пересечение с предыдущим диапазоном
    if (index > 0) {
      const prevRange = ranges[index - 1];
      const prevMax = Math.ceil(prevRange.max);

      if (min < prevMax) min = range.min;
      if (min === -0) min = 0;
    }

    // Проверка на пересечение со следующим диапазоном
    if (index < ranges.length - 1) {
      const nextRange = ranges[index + 1];
      const nextMin = Math.floor(nextRange.min);

      if (max > nextMin) max = range.max;
      if (max === -0) max = 0;
    }

    return { min, max };
  });

  // "Схлопывание" границ диапозонов
  return roundRange.map((range, index) => {
    let { min, max } = range;

    if (index < roundRange.length - 1) {
      const nextRange = roundRange[index + 1];
      if (max < nextRange.min) max = nextRange.min;
    }

    return { min, max };
  });
}


export const rangeToAdjustObject = (range) => {
  const rangeObject = [];

  range.map((range) => {
    const values = Object.values(range);
    rangeObject.push({ min: Math.min(...values), max: Math.max(...values) });
  });

  return adjustRanges(rangeObject);
};
