let _rows: number = 0;
let _cols: number = 0;

function init(length: number): void {
  _rows = length;
  _cols = length;
}

function merge(...matrices: number[][][]): number[][] {
  const numRows: number = matrices[0].length;
  const numCols: number = matrices[0][0].length;

  let result: number[][] = Array.from({ length: numRows }, () => Array(numCols).fill(0));

  for (let matrix of matrices) {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (matrix[i][j] !== 0) {
          result[i][j] = matrix[i][j];
        }
      }
    }
  }

  return result;
}

function subtract(matrix1: number[][], matrix2: number[][]): number[][] {
  const rows: number = matrix1.length;
  const cols: number = matrix1[0].length;

  // Ensure both matrices have the same dimensions
  if (matrix2.length !== rows || matrix2[0].length !== cols) {
    throw new Error("Matrices must have the same dimensions for subtraction");
  }

  // Initialize a result matrix
  let result: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  // Perform element-wise subtraction
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const num: number = matrix1[i][j] - matrix2[i][j];
      result[i][j] = num > 0 ? num : 0;
    }
  }

  return result;
}

function encode(matrix: number[][]): number[][] {
  return matrix;
}

function decode(string: number[][]): number[][] {
  return string;
}

// Experimental encoding/decoding
/* eslint-disable no-unused-vars */

function sparse_encode(matrix: number[][]): string {
  let result: string[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0) {
        result.push(`${matrix[i][j]}@${i},${j}`);
      }
    }
  }

  return result.join("-");
}

function sparse_decode(string: string): number[][] {
  let matrix: number[][] = Array.from({ length: _rows }, () => Array(_cols).fill(0));

  const entries: string[] = string.split("-");

  entries.forEach((entry) => {
    const [value, position] = entry.split("@");
    const [row, col] = position.split(",").map(Number);
    matrix[row][col] = Number(value);
  });

  return matrix;
}

function toString(matrix: number[][] | string): void {
  decode(matrix as number[][]).forEach((row) => {
    console.debug(`[${row.join(",")}]`);
  });
}

export { init, merge, encode, decode, subtract, toString, sparse_encode, sparse_decode };