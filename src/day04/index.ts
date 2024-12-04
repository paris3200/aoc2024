import run from "aocrunner";

const DEBUG = false;

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const printVisual = (visual: [[boolean | string]]) => {
  for (let i = 0; i < visual.length; i++) {
    let row = "";
    for (let j = 0; j < visual[i].length; j++) {
      if (visual[i][j] === false) {
        row += ".";
      } else {
        row += visual[i][j];
      }
    }
    console.log(row);
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let xmasCount = 0;
  let visual = [];
  const lineCount = input.length;
  const lineLength = input[0].length;

  if (DEBUG) {
    for (let i = 0; i < input.length; i++) {
      visual.push(Array(input[i].length).fill(false));
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];

      // Beginning of XMAS
      if (char === "X") {
        //North
        if (i > 2) {
          if (input[i - 1][j] === "M") {
            if (input[i - 2][j] === "A") {
              if (input[i - 3][j] === "S") {
                xmasCount += 1;

                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i - 1][j] === false) visual[i - 1][j] = "M";
                  if (visual[i - 2][j] === false) visual[i - 2][j] = "A";
                  if (visual[i - 3][j] === false) visual[i - 3][j] = "S";
                }
              }
            }
          }
        }

        // North East
        if (i > 2 && j + 2 < lineLength) {
          if (input[i - 1][j + 1] === "M") {
            if (input[i - 2][j + 2] === "A") {
              if (input[i - 3][j + 3] === "S") {
                xmasCount += 1;

                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i - 1][j + 1] === false)
                    visual[i - 1][j + 1] = "M";
                  if (visual[i - 2][j + 2] === false)
                    visual[i - 2][j + 2] = "A";
                  if (visual[i - 3][j + 3] === false)
                    visual[i - 3][j + 3] = "S";
                }
              }
            }
          }
        }

        // East
        if (j + 2 < lineLength) {
          if (input[i][j + 1] === "M") {
            if (input[i][j + 2] === "A") {
              if (input[i][j + 3] === "S") {
                xmasCount += 1;
                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i][j + 1] === false) visual[i][j + 1] = "M";
                  if (visual[i][j + 2] === false) visual[i][j + 2] = "A";
                  if (visual[i][j + 3] === false) visual[i][j + 3] = "S";
                }
              }
            }
          }
        }

        // South East
        if (i + 3 < lineCount && j + 2 < lineLength) {
          if (input[i + 1][j + 1] === "M") {
            if (input[i + 2][j + 2] === "A") {
              if (input[i + 3][j + 3] === "S") {
                xmasCount += 1;
                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i + 1][j + 1] === false)
                    visual[i + 1][j + 1] = "M";
                  if (visual[i + 2][j + 2] === false)
                    visual[i + 2][j + 2] = "A";
                  if (visual[i + 3][j + 3] === false)
                    visual[i + 3][j + 3] = "S";
                }
              }
            }
          }
        }

        // South
        if (i + 3 < lineCount) {
          if (input[i + 1][j] === "M") {
            if (input[i + 2][j] === "A") {
              if (input[i + 3][j] === "S") {
                xmasCount += 1;
                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i + 1][j] === false) visual[i + 1][j] = "M";
                  if (visual[i + 2][j] === false) visual[i + 2][j] = "A";
                  if (visual[i + 3][j] === false) visual[i + 3][j] = "S";
                }
              }
            }
          }
        }
        // South West
        if (i + 3 < lineCount && j > 2) {
          if (input[i + 1][j - 1] === "M") {
            if (input[i + 2][j - 2] === "A") {
              if (input[i + 3][j - 3] === "S") {
                xmasCount += 1;
                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i + 1][j - 1] === false)
                    visual[i + 1][j - 1] = "M";
                  if (visual[i + 2][j - 2] === false)
                    visual[i + 2][j - 2] = "A";
                  if (visual[i + 3][j - 3] === false)
                    visual[i + 3][j - 3] = "S";
                }
              }
            }
          }
        }

        // West
        if (j > 2) {
          if (input[i][j - 1] === "M") {
            if (input[i][j - 2] === "A") {
              if (input[i][j - 3] === "S") {
                xmasCount += 1;

                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i][j - 1] === false) visual[i][j - 1] = "M";
                  if (visual[i][j - 2] === false) visual[i][j - 2] = "A";
                  if (visual[i][j - 3] === false) visual[i][j - 3] = "S";
                }
              }
            }
          }
        }

        // North West
        if (i > 2 && j > 2) {
          if (input[i - 1][j - 1] === "M") {
            if (input[i - 2][j - 2] === "A") {
              if (input[i - 3][j - 3] === "S") {
                xmasCount += 1;
                if (DEBUG) {
                  if (visual[i][j] === false) visual[i][j] = "X";
                  if (visual[i - 1][j - 1] === false)
                    visual[i - 1][j - 1] = "M";
                  if (visual[i - 2][j - 2] === false)
                    visual[i - 2][j - 2] = "A";
                  if (visual[i - 3][j - 3] === false)
                    visual[i - 3][j - 3] = "S";
                }
              }
            }
          }
        }
      }
    }
  }

  if (DEBUG) {
    printVisual(visual);
  }
  return xmasCount.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lineCount = input.length;
  const lineLength = input[0].length;
  let visual = [];
  let count = 0;
  let validAs = [];

  if (DEBUG) {
    for (let i = 0; i < input.length; i++) {
      visual.push(Array(input[i].length).fill(false));
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];

      // Beginning of XMAS
      if (char === "A") {
        //M in top left
        if (
          i > 0 &&
          j > 0 &&
          input[i - 1][j - 1] === "M" &&
          i + 1 < lineCount &&
          j + 1 < lineLength &&
          input[i + 1][j + 1] === "S"
        ) {
          //M in top right
          if (
            (input[i + 1][j - 1] === "M" && input[i - 1][j + 1] === "S") ||
            (input[i + 1][j - 1] === "S" && input[i - 1][j + 1] === "M")
          ) {
            count += 1;
            if (DEBUG) {
              visual[i][j] = input[i][j];
              visual[i + 1][j + 1] = input[i + 1][j + 1];
              visual[i - 1][j - 1] = input[i - 1][j - 1];
              visual[i - 1][j + 1] = input[i - 1][j + 1];
              visual[i + 1][j - 1] = input[i - 1][j - 1];
            }
          }
        }
        //S in top left
        if (
          i > 0 &&
          j > 0 &&
          input[i - 1][j - 1] === "S" &&
          i + 1 < lineCount &&
          j + 1 < lineLength &&
          input[i + 1][j + 1] === "M"
        ) {
          if (
            (input[i + 1][j - 1] === "M" && input[i - 1][j + 1] === "S") ||
            (input[i + 1][j - 1] === "S" && input[i - 1][j + 1] === "M")
          ) {
            count += 1;
            if (DEBUG) {
              visual[i][j] = input[i][j];
              visual[i + 1][j + 1] = input[i + 1][j + 1];
              visual[i - 1][j - 1] = input[i - 1][j - 1];
              visual[i - 1][j + 1] = input[i - 1][j + 1];
              visual[i + 1][j - 1] = input[i - 1][j - 1];
            }
          }
        }
      }
    }
  }
  if (DEBUG) {
    printVisual(visual);
  }
  return count.toString();
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
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
