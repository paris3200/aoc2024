import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");

  let list1: number[] = [];
  let list2: number[] = [];
  lines.forEach((line) => {
    let item = line.split(" ");
    if (!isNaN(item[0]) && !isNaN(item[3])) {
      list1.push(parseInt(item[0]));
      list2.push(parseInt(item[3]));
    }
  });
  return [list1, list2];
};

const part1 = (rawInput: string) => {
  const [list1, list2] = parseInput(rawInput);

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);
  let difference = [];
  for (let x = 0; x < list1.length; x++) {
    difference.push(Math.abs(list1[x] - list2[x]));
  }

  return difference.reduce((sum, x) => sum + x, 0).toString();
};

const part2 = (rawInput: string) => {
  const [list1, list2] = parseInput(rawInput);

  let score = [];
  for (let x = 0; x < list1.length; x++) {
    let count = 0;
    for (let y = 0; y < list2.length; y++) {
      if (list1[x] === list2[y]) {
        count += 1;
      }
    }
    score.push(count * list1[x]);
  }
  return score.reduce((sum, x) => sum + x, 0).toString();
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
