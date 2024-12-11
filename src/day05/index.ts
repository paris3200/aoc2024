import run from "aocrunner";

const INSTRUCTIONS = new Map();

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n\n");
  const rawInstructions = input[0].split("\n");
  const rawUpdates = input[1].split("\n");

  // Map Rules
  for (let x = 0; x < rawInstructions.length; x++) {
    const rules = rawInstructions[x].split("|");

    if (INSTRUCTIONS.has(rules[0])) {
      let value = INSTRUCTIONS.get(rules[0]);
      value.push(rules[1]);

      INSTRUCTIONS.set(rules[0], value);
    } else {
      INSTRUCTIONS.set(rules[0], [rules[1]]);
    }
  }

  // Parse Updates
  let updates = [];
  for (let x = 0; x < rawUpdates.length; x++) {
    updates.push(rawUpdates[x].split(","));
  }

  return updates;
};

const validUpdate = (update: string[]) => {
  for (let y = 0; y < update.length; y++) {
    const previousUpdate = update.slice(0, y);
    const afterUpdates = INSTRUCTIONS.get(update[y]);

    for (const record in afterUpdates) {
      if (previousUpdate.includes(afterUpdates[record])) {
        return y;
      }
    }
  }
  return true;
};

const part1 = (rawInput: string) => {
  const updates = parseInput(rawInput);
  let validMiddles = [];

  for (let x = 0; x < updates.length; x++) {
    if (validUpdate(updates[x]) === true) {
      // Get Midpoint of updates[x]
      const middleIndex = Math.floor(updates[x].length / 2);
      validMiddles.push(updates[x][middleIndex]);
    }
  }

  return validMiddles
    .reduce((sum, value) => {
      return sum + parseInt(value);
    }, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const DEBUG = true;
  const updates = parseInput(rawInput);
  let validMiddles: string[] = [];
  let invalidUpdates = [];

  for (let x = 0; x < updates.length; x++) {
    let index = validUpdate(updates[x]);
    if (index !== true) {
      invalidUpdates.push(updates[x]);
    }
  }

  while (invalidUpdates.length != 0) {
    let invalidUpdate = invalidUpdates.pop()?.reverse();
    if (DEBUG) console.log(invalidUpdate);

    // let sorted = structuredClone(invalidUpdate)
    let sorted: number[] = [];
    invalidUpdate?.forEach((key, index) => {
      if (sorted.length === 0) {
        sorted.push(key);
      } else {
        console.log("Key:", key);
        let previous = sorted[index - 1];
        let instructions = INSTRUCTIONS.get(key);

        if (instructions) {
          if (instructions.includes(previous)) {
            sorted.push(key);
          } else {
            console.log("Need to slice");
          }
        } else {
          sorted.push(key);
        }
      }
      if (DEBUG) console.log(sorted);
    });
  }

  return validMiddles
    .reduce((sum, value) => {
      return sum + parseInt(value);
    }, 0)
    .toString();
};

run({
  part1: {
    tests: [
      {
        input: `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: "143",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: "123",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
