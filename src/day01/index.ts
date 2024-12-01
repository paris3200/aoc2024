import run from "aocrunner";

const parseInput = (rawInput: string): [number[], number[]] => {
  const lines = rawInput.split("\n");

  let list1: number[] = [];
  let list2: number[] = [];

  for (const line of lines) {
    const [item1, , , item2] = line.split(" ");
    const num1 = parseInt(item1);
    const num2 = parseInt(item2);

    list1.push(num1);
    list2.push(num2);
  }

  return [list1, list2];
};

const part1 = (rawInput: string) => {
  const [list1, list2] = parseInput(rawInput);

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  return list1
    .reduce((sum, value, index) => {
      return sum + Math.abs(value - list2[index]);
    }, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const [list1, list2] = parseInput(rawInput);

  const frequencyMap = new Map<number, number>();
  for (const num of list2) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  const score = list1.reduce((total, value) => {
    const count = frequencyMap.get(value) || 0;
    return total + count * value;
  }, 0);

  return score.toString();
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
