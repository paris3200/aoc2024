import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");
  let grid = [];
  for (let i = 0; i < lines.length; i++) {
    grid[i] = [];
    for (let j = 0; j < lines[i].length; j++) {
      grid[i].push(lines[i][j]);
    }
  }
  return grid;
};

const printGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    let line = "";
    for (let j = 0; j < grid[i].length; j++) {
      line += grid[i][j];
    }
    console.log(line);
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let direction = "N";

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
  onlyTests: true,
});
