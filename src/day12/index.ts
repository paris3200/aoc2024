import run from "aocrunner";

type Point = [number, number];
type RegionMap = Map<string, Point[][]>;

const parseInput = (rawInput: string) => {
  const input = rawInput
    .trim()
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.split(""));

  const regions: RegionMap = new Map();
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const key = input[i][j];

      if (!regions.has(key)) {
        regions.set(key, []);
      }

      const areas = regions.get(key)!;

      let added = false;
      for (const area of areas) {
        if (isAdjacent([i, j], area)) {
          area.push([i, j]);
          added = true;
          break;
        }
      }

      if (!added) {
        areas.push([[i, j]]);
      }
    }
  }

  //TODO: This right here
  for (const [key, points] of regions) {
    let mergedPoints = [];
    if (points.length >= 2) {
      for (let i = 1; i < points.length; i++) {
        for (const point of points[i]) {
          if (isAdjacent(point, points[i - 1])) {
            mergedPoints.push(...points[i]);
          }
        }
      }
    }
  }

  return regions;
};

const getArea = (points: [number[]]): number => {
  return points.length;
};

const isAdjacent = (
  point: [number, number],
  points: [[number, number]],
): boolean => {
  const [i, j] = point;

  let edges = [];
  edges.push([i - 1, j]);
  edges.push([i + 1, j]);
  edges.push([i, j - 1]);
  edges.push([i, j + 1]);

  for (const edge of edges) {
    const adjacent = points.some(([a, b]) => a === edge[0] && b === edge[1]);

    if (adjacent) {
      return true;
    }
  }
  return false;
};

const getPerimeter = (points: [number[]]): number => {
  let sum = 0;
  for (const point of points) {
    const [i, j] = point;

    let edges = [];
    edges.push([i - 1, j]);
    edges.push([i + 1, j]);
    edges.push([i, j - 1]);
    edges.push([i, j + 1]);

    for (const edge of edges) {
      const exists = points.some(([a, b]) => a === edge[0] && b === edge[1]);

      if (!exists) {
        sum += 1;
      }
    }
  }

  return sum;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;

  for (const [key, value] of input) {
    console.log(key, value);
  }

  input.forEach((value, key) => {
    for (const area of value) {
      const perimeter = getPerimeter(area);
      const groupArea = getArea(area);
      const cost = perimeter * groupArea;
      console.log(`${key}: ${groupArea} x ${perimeter} = ${cost}`);
      sum += cost;
    }
  });

  return sum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: "140",
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: "1930",
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
