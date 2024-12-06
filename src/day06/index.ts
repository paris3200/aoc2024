import run from "aocrunner";
import { dir } from "console";
import { start } from "repl";

let GRID: [[string | boolean]] = [];
const parseInput = (rawInput: string) => {
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
    let line = "";
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

const move = (direction: string, starting: [number, number]) => {
  if (direction === "N") {
    console.log("Moving North");
    console.log(starting);
    for (let i = starting[0]; i >= 0; i--) {
      if (GRID[i][starting[1]] === "#") {
        console.log("Hit Wall");
        return [i + 1, starting[1]];
      } else if (i - 1 < 0) {
        setVisited(i, starting[1]);
        return -1;
      }
      setVisited(i, starting[1]);
    }
  }
  if (direction === "E") {
    console.log("Moving East");
    console.log("Starting East: ", starting);
    for (let j = starting[1]; j < GRID[0].length + 1; j++) {
      if (GRID[starting[0]][j] === "#") {
        return [starting[0], j - 1];
      } else if (j + 1 == GRID[0].length) {
        setVisited(starting[0], j);
        return -1;
      }
      setVisited(starting[0], j);
    }
  }
  if (direction === "S") {
    console.log("Moving South");
    console.log(starting);
    for (let i = starting[0]; i < GRID.length; i++) {
      if (GRID[i][starting[1]] === "#") {
        return [i - 1, starting[1]];
      } else if (i + 1 > GRID.length - 1) {
        setVisited(i, starting[1]);
        return -1;
      }
      setVisited(i, starting[1]);
    }
  }
  if (direction === "W") {
    console.log("Moving West");
    console.log("Starting West: ", starting);
    for (let j = starting[1]; j >= 0; j--) {
      if (GRID[starting[0]][j] === "#") {
        return [starting[0], j + 1];
      } else if (j - 1 < 0) {
        setVisited(starting[0], j);
        return -1;
      }
      setVisited(starting[0], j);
    }
  }
};

const part1 = (rawInput: string) => {
  let point = parseInput(rawInput);
  console.log("Origin:", point);
  let directions = ["N", "E", "S", "W"];
  let directionCount = 0;
  printGrid();

  const updateDirectionCount = () => {
    if (directionCount === directions.length - 1) {
      directionCount = 0;
    } else {
      directionCount += 1;
    }
  };

  while (point !== -1 && point !== undefined) {
    point = move(directions[directionCount], point);
    if (point !== -1 && point !== undefined) {
      console.log("Point:", point);
      updateDirectionCount();
      console.log("Stopped at:", point);
    } else if (point === -1) {
      console.log("Solved");
    }
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
