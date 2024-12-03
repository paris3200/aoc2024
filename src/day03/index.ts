import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const parseValidInput = (input: string): number => {
  const re = /mul\(\d+,\s*\d+\)/g;
  let products = [];

  let matches = input.match(re);
  for (let y = 0; y < matches.length; y++) {
    let strip1 = matches[y].replace("mul(", "");
    let strip2 = strip1.replace(")", "");
    const [input1, input2] = strip2.split(",");
    const num1 = parseInt(input1);
    const num2 = parseInt(input2);

    products.push(num1 * num2);
  }

  return products.reduce((sum, value) => {
    return sum + value;
  }, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let products = [];

  for (let x = 0; x < input.length; x++) {
    products.push(parseValidInput(input[x]));
  }

  return products
    .reduce((sum, value) => {
      return sum + value;
    }, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const re = /mul\(\d+,\s*\d+\)/g;

  const onResults = [];
  for (let x = 0; x < input.length; x++) {
    const result = input[x].split("don't");

    for (let y = 0; y < result.length; y += 2) {
      onResults.push(result[y]);
    }
  }

  let products = [];

  for (let x = 0; x < onResults.length; x++) {
    products.push(parseValidInput(onResults[x]));
  }

  return products
    .reduce((sum, value) => {
      return sum + value;
    }, 0)
    .toString();
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
