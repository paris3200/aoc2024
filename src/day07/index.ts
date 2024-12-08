import run from "aocrunner";

const parseInput = (rawInput: string): Array<[number, number[]]> => {
  const lines = rawInput.split("\n");

  let parsedInput: Array<[number, number[]]> = [];
  for (let x = 0; x < lines.length; x++) {
    let input = lines[x].split(":");
    let numbers = input[1]
      .trim()
      .split(" ")
      .map((num) => {
        return parseInt(num);
      });
    const result = parseInt(input[0]);
    parsedInput.push([result, numbers]);
  }
  return parsedInput;
};

const getPermutations = (items: number, options: string[]): string[][] => {
  const result: string[][] = [];

  function backtrack(permutation: string[]): void {
    if (permutation.length === items) {
      result.push([...permutation]);
      return;
    }

    for (const option of options) {
      backtrack([...permutation, option]);
    }
  }

  backtrack([]);
  return result;
};

const part1 = (rawInput: string) => {
  const OPERATORS = ["+", "*"];
  const DEBUG = false;
  let calibrationResult = new Set();

  const input = parseInput(rawInput);

  input.forEach((equation) => {
    if (DEBUG) console.log("\nEquation: ", equation);
    const answer = equation[0];
    let originalNumbers = equation[1].reverse();

    if (DEBUG) console.log("Answer: ", answer);
    if (DEBUG) console.log("Numbers: ", originalNumbers);
    let operatorCount = originalNumbers.length - 1;

    getPermutations(operatorCount, OPERATORS).forEach((combos) => {
      let numbers = structuredClone(originalNumbers);
      if (DEBUG) console.log("Combos: ", combos);
      let evalSum = numbers.pop();

      combos.forEach((operator) => {
        let evalString = evalSum + operator + numbers.pop();
        evalSum = eval(evalString);
      });
      // if (DEBUG) console.log(`${evalString} = ${eval(evalString)} | ${answer}`);
      if (evalSum === answer) {
        calibrationResult.add(answer);
      }
    });
  });

  let sum = 0;
  calibrationResult.forEach((value: number) => {
    sum += value;
  });
  return sum.toString();
};

const part2 = (rawInput: string) => {
  const OPERATORS = ["+", "*", "||"];
  const DEBUG = false;
  let calibrationResult = new Set();

  const input = parseInput(rawInput);

  input.forEach((equation) => {
    if (DEBUG) console.log("\nEquation: ", equation);
    const answer = equation[0];
    let originalNumbers = equation[1].reverse();

    if (DEBUG) console.log("Answer: ", answer);
    if (DEBUG) console.log("Numbers: ", originalNumbers);
    let operatorCount = originalNumbers.length - 1;

    getPermutations(operatorCount, OPERATORS).forEach((combos) => {
      let numbers = structuredClone(originalNumbers);
      if (DEBUG) console.log("Combos: ", combos);
      let evalSum = numbers.pop();

      combos.forEach((operator) => {
        if (operator === "||") {
          evalSum = parseInt(evalSum + "" + numbers.pop());
        } else {
          let evalString = evalSum + operator + numbers.pop();
          evalSum = eval(evalString);
        }
      });
      if (evalSum === answer) {
        calibrationResult.add(answer);
      }
    });
  });

  let sum = 0;
  calibrationResult.forEach((value: number) => {
    sum += value;
  });
  return sum.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: "3749",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: "11387",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
