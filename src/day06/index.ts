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

const getVisited = () => {
  let visited = new Set();
  for (let i = 0; i < GRID.length; i++) {
    for (let j = 0; j < GRID[i].length; j++) {
      if (GRID[i][j] === true) {
        visited.add([i, j]);
      }
    }
  }
  return visited;
};

const setVisited = (i: number, j: number) => {
  if (GRID[i][j] !== true) {
    GRID[i][j] = true;
  }
};

const move = (
  direction: string,
  starting: [number, number],
): number[] | -1 | 1 => {
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

const solveGrid = (start: number[]): boolean => {
  let point = start;

  let directions = ["N", "E", "S", "W"];
  let directionCount = 0;

  const updateDirectionCount = () => {
    if (directionCount === directions.length - 1) {
      directionCount = 0;
    } else {
      directionCount += 1;
    }
  };

  const visitedPoints = new Map();

  while (Array.isArray(point)) {
    let pointLabel = point[0] + "-" + point[1] + directions[directionCount];
    if (visitedPoints.has(pointLabel)) {
      return false;
    } else {
      visitedPoints.set(pointLabel, true);
    }
    point = move(directions[directionCount], point);
    updateDirectionCount();
  }
  // console.log(visitedPoints);

  if (point == -1) {
    return true;
  }

  return false;
};

const part1 = (rawInput: string) => {
  let origin = parseInput(rawInput);
  solveGrid(origin);
  // printGrid();
  return countVisited().toString();
};

const part2 = (rawInput: string) => {
  const origin = parseInput(rawInput);
  const gridCopyUnsolved = structuredClone(GRID);
  solveGrid(origin);
  let gridCopySolved = structuredClone(GRID);

  let visitedPoints = getVisited();
  let loopCount = 0;

  let addedPoints = [];
  visitedPoints.forEach((points) => {
    GRID = structuredClone(gridCopyUnsolved);
    GRID[points[0]][points[1]] = "#";
    let isSolved = solveGrid(origin);
    if (isSolved === false) {
      addedPoints.push([points[0], points[1]]);
      loopCount += 1;
    }
  });

  // console.log(addedPoints);
  // addedPoints.forEach((point) => {
  //   console.log("Point:", point);
  //   GRID = structuredClone(gridCopyUnsolved);
  //   GRID[point[0]][point[1]] = "0";
  //   printGrid();
  //   console.log();
  // });

  // GRID = gridCopyUnsolved;
  // GRID[6][3] = "#";
  // let isLoop = solveGrid(origin);
  // printGrid();
  // console.log(isLoop);

  return loopCount.toString();
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
        expected: "6",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
