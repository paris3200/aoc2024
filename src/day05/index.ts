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

const solveUpdate = (update: string[]): number => {
  // console.log("\nOrginal Input", update);
  const index = validUpdate(update);
  if (index === true) {
    const middleIndex = Math.floor(update.length / 2);
    console.log(`Valid!`);
    return parseInt(update[middleIndex]);
  } else {
    console.log("\nInvalid Update:", update);
    console.log("Error found at:", index);
    const afterUpdates = INSTRUCTIONS.get(update[index]);
    // console.log("After Updates:", afterUpdates);
    const value1 = update[index];
    let value2;
    let value2Index;
    const previousUpdate = update.slice(0, index);
    for (const record in afterUpdates) {
      if (previousUpdate.includes(afterUpdates[record])) {
        value2 = afterUpdates[record];
        value2Index = previousUpdate.indexOf(value2);
      }
    }
    console.log(
      `${value1} at index ${index} needs to be before ${value2} at index ${value2Index}`,
    );
    console.log("Switching...");
    update.splice(value2Index, 1, value1);
    update.splice(index, 1, value2);
    // update.splice(value2Index, 1, value1);
    console.log(`${update}`);
    return solveUpdate(update);
  }
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
  const updates = parseInput(rawInput);
  let validMiddles = [];
  let invalidUpdates = [];

  for (let x = 0; x < updates.length; x++) {
    let index = validUpdate(updates[x]);
    if (index !== true) {
      invalidUpdates.push(updates[x]);
    }
  }

  while (invalidUpdates.length != 0) {
    let invalidUpdate = invalidUpdates.pop();
    validMiddles.push(solveUpdate(invalidUpdate));
  }

  console.log(validMiddles);
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
  onlyTests: false,
});
