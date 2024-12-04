import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const parseFunction = (input: string) => {
  let strip1 = input.replace("mul(", "");
  let strip2 = strip1.replace(")", "");
  const [input1, input2] = strip2.split(",");
  const num1 = parseInt(input1);
  const num2 = parseInt(input2);
  return num1 * num2;
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
  return parseValidInput(input).toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const re = /mul\(\d+,\s*\d+\)/g;
  const doRe = /do\(\)/g;
  const donotRe = /don't\(\)/g;
  let sum = 0;

  let dos = [{ index: 0 }];
  let donts = [];
  let match;
  let products = [];

  // Add all valid functions to products with their index
  while ((match = re.exec(input))) {
    let product = parseFunction(match[0]);
    products.push({ product: product, index: match.index });
  }

  // Get all do()'s with their index
  let doMatch;
  while ((doMatch = doRe.exec(input))) {
    dos.push({ index: doMatch.index });
  }

  // Get all don't()'s with their index
  let donotMatch;
  while ((donotMatch = donotRe.exec(input))) {
    donts.push({ index: donotMatch.index });
  }

  // Reverse so we can just use pop()
  donts.reverse();
  dos.reverse();

  let off = donts.pop()?.index;
  let on = dos.pop()?.index;

  for (let x = 0; x < products.length; x++) {
    if (
      products[x].index > on &&
      (products[x].index < off || off === undefined)
    ) {
      sum += products[x].product;
      products.slice(x, 1);
    } else {
      if (products[x].index > off) {
        on = dos.pop()?.index;

        while (off < on) {
          off = donts.pop()?.index;
        }
      }
    }
  }

  return sum.toString();
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
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+don't()mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+don't()mul(32,64](mul(11,8)undo()do()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
