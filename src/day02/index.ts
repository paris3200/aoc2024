import run from "aocrunner";
import { send } from "process";

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

const processReport = (report: number[]): boolean => {
  let invalid = false;
  let increasing: boolean | null = null;

  for (let y = 0; y < report.length - 1; y++) {
    if (y !== report.length) {
      let diff = report[y] - report[y + 1];
      const absDiff = Math.abs(diff);
      const step = diff === absDiff;

      if (y === 0) {
        increasing = step;
      }

      if (step != increasing || absDiff < 1 || absDiff > 3) {
        invalid = true;
      }
    }
  }

  return invalid;
};

const processReports = (input) => {
  let safeReports = 0;

  for (let x = 0; x < input.length; x++) {
    let invalid = false;
    let increasing: boolean | null = null;

    for (let y = 0; y < input[x].length - 1; y++) {
      if (y !== input[x].length) {
        let diff = input[x][y] - input[x][y + 1];
        const absDiff = Math.abs(diff);

        const step = diff === absDiff;

        if (y === 0) {
          increasing = step;
        }

        if (step != increasing || absDiff < 1 || absDiff > 3) {
          invalid = true;
        }
      }
    }

    if (invalid === false) {
      safeReports += 1;
    }
  }

  return safeReports;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return processReports(input).toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let safeReports = 0;

  for (let x = 0; x < input.length; x++) {
    let invalid = false;
    let increasing: boolean | null = null;
    let dampener: boolean | null = null;

    for (let y = 0; y < input[x].length - 1; y++) {
      if (y !== input[x].length) {
        let diff = input[x][y] - input[x][y + 1];
        const absDiff = Math.abs(diff);

        const step = diff === absDiff;

        if (y === 0) {
          increasing = step;
        }

        if (step != increasing || absDiff < 1 || absDiff > 3) {
          if (dampener === null) {
            const copyReportA = structuredClone(input[x]);
            const copyReportB = structuredClone(input[x]);
            copyReportA.splice(y, 1);
            copyReportB.splice(y + 1, 1);

            if (
              processReport(copyReportA) === false &&
              processReport(copyReportB) === false
            ) {
              invalid = true;
            }

            break;
          } else {
            invalid = true;
          }
        }
      }
    }

    if (invalid === false) {
      safeReports += 1;
    }
  }

  return safeReports.toString();
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
