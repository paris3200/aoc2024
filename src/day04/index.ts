import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let xmasCount = 0;
  let visual = [];

  
  for (let i = 0; i < input.length; i++) {
    visual.push(Array(input[i].length).fill(false))
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];
      const lineLength = input[i].length;
      const lineCount = input.length;
      const wordLength = 4;

      // Beginning of XMAS
      if (char === "X") {
        // North
        if (i >= wordLength) {
          if (input[i - 1][j] === "M") {
            if (input[i - 2][j] === "A") {
              if (input[i - 3][j] === "S") {
                // xmasCount += 1;
                // if (visual[i][j] === ".") visual[i][j] = "X";
                // if (visual[i - 1][j] === ".") visual[i][j] = "M";
                // if (visual[i - 2][j] === ".") visual[i][j] = "A";
                // if (visual[i - 3][j] === ".") visual[i][j] = "S";
              }
            }
          }
        }
        // North East
        if (i >= wordLength && j <= lineLength - wordLength) {
          if (input[i - 1][j + 1] === "M") {
            if (input[i - 2][j + 2] === "A") {
              if (input[i - 3][j + 3] === "S") {
                // xmasCount += 1;
              }
            }
          }
        }
        // East
        if (i >= wordLength && j <= lineLength - wordLength) {
          if (input[i][j + 1] === "M") {
            if (input[i][j + 2] === "A") {
              if (input[i][j + 3] === "S") {
                // xmasCount += 1;
              }
            }
          }
        }
        // South East
        if (i <= lineCount - wordLength && j <= lineLength - wordLength) {
          // console.log(`South East: ${i}, ${j}`);
          if (input[i + 1][j + 1] === "M") {
            // console.log(`True ${i + 1}, ${j + 1}`);
            if (input[i + 2][j + 2] === "A") {
              // console.log(`True ${i}, ${j}`);
              if (input[i + 3][j + 3] === "S") {
                xmasCount += 1;
              }
            }
          }
        }
        // South
        // South West
        // West
        // North West
      }
    }
  }
  for (let i = 0; i < visual.length; i++) {
  for (let j = 0; i < visual[j].length; i++) {
    console.log(visual[i][j])
  }
  return xmasCount;
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
