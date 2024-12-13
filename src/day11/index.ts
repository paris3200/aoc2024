import run from "aocrunner";

const stoneValue = new Map();
let blinksSaved = 0;

const parseInput = (rawInput: string) => {
  return rawInput
    .trim()
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.split(" "))[0];
};

const parseStone = (stone: string): string[] => {
  const stoneInt = parseInt(stone);
  if (stoneInt === 0) {
    return ["1"];
  }

  if (stone.length % 2 === 0) {
    const mid = stone.length / 2;
    const leftStone = parseInt(stone.slice(0, mid));
    const rightStone = parseInt(stone.slice(mid));
    return [leftStone.toString(), rightStone.toString()];
  }

  return [(stoneInt * 2024).toString()];
};

const blinkStone = (stone: string, blinksRemaining: number): number => {
  const key = `${stone}-${blinksRemaining}`;

  if (stoneValue.has(key)) {
    blinksSaved += blinksRemaining;
    return stoneValue.get(key)!;
  }

  let result: number;

  if (blinksRemaining === 0) {
    result = 1;
  } else {
    const parsedStones: string[] = parseStone(stone);
    result = parsedStones.reduce(
      (sum: number, nextStone: string): number =>
        sum + blinkStone(nextStone, blinksRemaining - 1),
      0,
    );
  }

  stoneValue.set(key, result);
  return result;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  stoneValue.clear();

  let count = 0;
  for (let stone of input) {
    count += blinkStone(stone, 25);
  }
  console.log("Blinks Saved", blinksSaved);
  return count.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let count = 0;
  for (let stone of input) {
    count += blinkStone(stone, 75);
  }

  console.log("Blinks Saved", blinksSaved);
  return count.toString();
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: "55312",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `125 17`,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
