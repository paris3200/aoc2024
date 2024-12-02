import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");
  let reports = [];
  for (let x = 0; x < lines.length; x++) {
    const readings = lines[x].split(" ");
    const report = [];
    for (let y = 0; y < readings.length; y++) {
      report.push(parseInt(readings[y]));
    }
    reports.push(report);
  }
  return reports;
};

const validateReport = (report: number[]): boolean => {
  let increasing: boolean | null = null;

  for (let y = 0; y < report.length - 1; y++) {
    const diff = report[y] - report[y + 1];
    const absDiff = Math.abs(diff);
    const stepIncrease = diff === absDiff;

    if (absDiff < 1 || absDiff > 3) return false;
    if (increasing === null) increasing = stepIncrease;
    if (stepIncrease != increasing) return false;
  }
  return true;
};

// TODO: Refactor this
const applyDampener = (report: number[]): boolean => {
  let valid = false;
  let dampenedReports = [];
  for (let x = 0; x < report.length; x++) {
    const filteredReport = structuredClone(report);
    filteredReport.splice(x, 1);
    dampenedReports.push(filteredReport);
  }

  for (const report of dampenedReports) {
    if (validateReport(report)) {
      valid = true;
      break;
    }
  }
  return valid;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let validReports = input.reduce((count, report) => {
    return count + (validateReport(report) ? 1 : 0);
  }, 0);

  return validReports.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let validReports = input.reduce((count, report) => {
    return count + (validateReport(report) ? 1 : applyDampener(report) ? 1 : 0);
  }, 0);

  return validReports.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
            7 6 4 2 1
            1 2 7 8 9
            9 7 6 2 1
            1 3 2 4 5
            8 6 4 4 1
            1 3 6 7 9
            `,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
            7 6 4 2 1
            1 2 7 8 9
            9 7 6 2 1
            1 3 2 4 5
            8 6 4 4 1
            1 3 6 7 9
            `,
        expected: "4",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
