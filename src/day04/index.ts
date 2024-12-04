import run from "aocrunner";

const XMAS = ["X", "M", "A", "S"];

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let startCoords: [number, number] = [];
  const collection = new Map();

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];

      if (XMAS[0].includes(char)) {
        startCoords.push([i, j]);
      }

      if (XMAS.includes(char)) {
        char === "X" && startCoords.push([i, j]);
        collection.set(`${i}-${j}`);
      }
    }
  }
  console.log(startCoords);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
          MSAMXMSMSA
          AMXSXMAAMM
          MSAMASMSMX
          XMASAMXAMM
          XXAMMXXAMA
          SMSMSASXSS
          SAXAMASAAA
          MAMMMXMMMM
          MXMXAXMASX`,
        expected: "18",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
