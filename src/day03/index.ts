import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

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
  const doRe = /do\(\)/g;
  const donotRe = /don't\(\)/g;
  let sum = 0;

  for (let x = 0; x < input.length; x++) {
    let match;
    let products = [];
    let dos = [{ index: 0 }];
    let donts = [];
    while ((match = re.exec(input[x]))) {
      let product = parseFunction(match[0]);
      products.push({ product: product, index: match.index });
    }

    let doMatch;
    while ((doMatch = doRe.exec(input[x]))) {
      dos.push({ index: doMatch.index });
    }
    let donotMatch;
    while ((donotMatch = donotRe.exec(input[x]))) {
      donts.push({ index: donotMatch.index });
    }

    donts.reverse();
    dos.reverse();

    console.log(products);
    console.log("Don'ts:", donts);
    console.log("Dos:", dos);

    let off = donts.pop()?.index;
    let on = dos.pop()?.index;

    for (let x = 0; x < products.length; x++) {
      console.log("\nProduct: ", products[x]);
      console.log("On: ", on);
      console.log("Off: ", off);
      if (
        products[x].index > on &&
        (products[x].index < off || off === undefined)
      ) {
        console.log(
          `Valid: index (${products[x].index}) is between ${on} and ${off} `,
        );
        // sum.push(products[x].product);
        sum += products[x].product;
        products.slice(x, 1);
      } else {
        console.log(
          `Invalid: index (${products[x].index}) is not between ${on} and ${off} `,
        );
        if (products[x].index > off) {
          off = donts.pop()?.index;
          on = dos.pop()?.index;
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
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
