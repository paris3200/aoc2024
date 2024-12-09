import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const getDiskString = (diskmap: string): string => {
  let resultString = "";
  for (let x = 0; x < diskmap.length; x++) {
    if (x % 2 === 0) {
      if (x === 0) {
        resultString += x.toString().repeat(diskmap[x]);
      } else {
        resultString += (x / 2).toString().repeat(parseInt(diskmap[x]));
      }
    } else {
      resultString = resultString + ".".repeat(parseInt(diskmap[x]));
    }
  }
  return resultString;
};

const countFreeSpace = (diskString: string) => {
  const count = diskString.match(/\./g);
  return count?.length;
};

const getChunk = (
  diskString: string,
): { startIndex: number; length: number } | null => {
  let start = -1;
  let length = 0;
  for (let x = 0; x < diskString.length; x++) {
    if (diskString[x] === ".") {
      if (start == -1) {
        start = x;
        length = 1;
      } else {
        length += 1;
      }
    } else {
      if (start != -1 && length != 0) {
        return { startIndex: start, length };
      }
    }
  }
  return null;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let diskString = getDiskString(input[0]);
  let fileStringCopy = structuredClone(diskString);
  let freeSpace = countFreeSpace(diskString);

  let trimmedString = fileStringCopy.replace(/\./g, "");
  let trimmedArray = trimmedString.split("");

  let count = 0;
  while (trimmedArray.length != 0) {
    console.log("\n", diskString);
    const chunk = getChunk(diskString);
    if (chunk) {
      const { startIndex, length } = chunk;

      console.log(`Chunk found at ${startIndex} with a length of ${length}`);
      diskString =
        diskString.slice(0, startIndex - 1) +
        "#".repeat(length) +
        diskString.slice(startIndex + (length - 1));
      console.log(diskString);
    }

    count += 1;
    if (count > 10) {
      break;
    }
  }

  return freeSpace;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `12345`,
        expected: "6",
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
  onlyTests: true,
});
