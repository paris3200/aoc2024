import run from "aocrunner";

let GRID: [[string | boolean]] = [];
const parseInput = (rawInput: string): number[] => {
  const lines = rawInput.split("\n");
  let origin = [0, 0];
  for (let i = 0; i < lines.length; i++) {
    GRID[i] = [];
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "^") {
        origin = [i, j];
      }
      GRID[i].push(lines[i][j]);
    }
  }
  return origin;
};

const printGrid = () => {
  for (let i = 0; i < GRID.length; i++) {
    let line = "";
    for (let j = 0; j < GRID[i].length; j++) {
      if (GRID[i][j] === true) {
        line += "X";
      } else {
        line += GRID[i][j];
      }
    }
    console.log(line);
  }
};

const countVisited = () => {
  let count = 0;
  for (let i = 0; i < GRID.length; i++) {
    for (let j = 0; j < GRID[i].length; j++) {
      if (GRID[i][j] === true) {
        count += 1;
      }
    }
  }
  return count;
};

const setVisited = (i: number, j: number) => {
  if (GRID[i][j] !== true) {
    GRID[i][j] = true;
  }
};

const move = (direction: string, starting: [number, number]): number[] | -1 => {
  switch (direction) {
    case "N":
      for (let i = starting[0]; i >= 0; i--) {
        if (GRID[i][starting[1]] === "#") {
          return [i + 1, starting[1]];
        } else if (i - 1 < 0) {
          setVisited(i, starting[1]);
          return -1;
        }
        setVisited(i, starting[1]);
      }
      break;

    case "E":
      for (let j = starting[1]; j < GRID[0].length + 1; j++) {
        if (GRID[starting[0]][j] === "#") {
          return [starting[0], j - 1];
        } else if (j + 1 == GRID[0].length) {
          setVisited(starting[0], j);
          return -1;
        }
        setVisited(starting[0], j);
      }
      break;

    case "S":
      for (let i = starting[0]; i < GRID.length; i++) {
        if (GRID[i][starting[1]] === "#") {
          return [i - 1, starting[1]];
        } else if (i + 1 > GRID.length - 1) {
          setVisited(i, starting[1]);
          return -1;
        }
        setVisited(i, starting[1]);
      }
      break;

    case "W":
      for (let j = starting[1]; j >= 0; j--) {
        if (GRID[starting[0]][j] === "#") {
          return [starting[0], j + 1];
        } else if (j - 1 < 0) {
          setVisited(starting[0], j);
          return -1;
        }
        setVisited(starting[0], j);
      }
      break;

    default:
      throw new Error(`Invalid direction: ${direction}`);
  }
  return -1;
};

const part1 = (rawInput: string) => {
  let origin = parseInput(rawInput);
  let point: number[] | -1 = origin;
  let directions = ["N", "E", "S", "W"];
  let directionCount = 0;

  const updateDirectionCount = () => {
    if (directionCount === directions.length - 1) {
      directionCount = 0;
    } else {
      directionCount += 1;
    }
  };

  while (Array.isArray(point)) {
    point = move(directions[directionCount], point);
    updateDirectionCount();
  }

  printGrid();
  return countVisited().toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: "41",
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
  onlyTests: false,
});
