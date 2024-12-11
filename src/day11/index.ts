import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .trim()
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.split(" "))[0];
};

const parseStone = (stone: string): string | string[] => {
  // console.log(stone);
  let stoneInt = parseInt(stone);
  if (stoneInt === 0) {
    return ["1"];
  }

  if (stone.length % 2 === 0) {
    const mid = stone.length / 2;
    let leftStone = parseInt(stone.slice(0, mid));
    let rightStone = parseInt(stone.slice(mid));
    return [leftStone?.toString(), rightStone?.toString()];
  }

  return [(stoneInt * 2024).toString()];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = structuredClone(input);
  for (let x = 0; x < 25; x++) {
    let blinkArray = [];
    for (let stone of result) {
      let blinkResult = parseStone(stone);
      for (let blinkStone of blinkResult) {
        blinkArray.push(blinkStone);
      }
    }
    result = structuredClone(blinkArray);
  }

  // console.log(result);
  return result.length.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = structuredClone(input);
  for (let x = 0; x < 75; x++) {
    let blinkArray = [];
    for (let stone of result) {
      let blinkResult = parseStone(stone);
      for (let blinkStone of blinkResult) {
        blinkArray.push(blinkStone);
      }
    }
    result = structuredClone(blinkArray);
  }

  // console.log(result);
  return result.length.toString();
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
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
