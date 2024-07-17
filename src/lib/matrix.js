
export const transposeMatrix = (matrix) => {
  const transposed = [];

  for (let i = 0; i < matrix[0].length; i++) {
    transposed[i] = [];
    for (let j = 0; j < matrix.length; j++) transposed[i][j] = matrix[j][i];
  }

  return transposed;
}

export const multiplyMatrixByVector = (matrix, vector) => {
  if (matrix[0].length !== vector.length) {
    console.log(matrix, vector);
    console.log(matrix[0].length, vector.length);
    throw new Error('Количество столбцов в матрице должно быть равно размеру вектора');
  }

  let result = new Array(matrix.length).fill(0);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < vector.length; j++) {
      result[i] += matrix[i][j] * vector[j];
    }
  }

  return result;
}
