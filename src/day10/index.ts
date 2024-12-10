import run from "aocrunner";

type Vertex = {
  value: number;
  edges: string[];
};

const parseInput = (rawInput: string) => rawInput.split("\n");

class Graph {
  vertices: Map<string, Vertex>;
  constructor() {
    this.vertices = new Map();
  }

  addVertex(name: string, value: number): boolean {
    if (!this.vertices.has(name)) {
      this.vertices.set(name, { value, edges: [] });
      return true;
    }
    return false;
  }

  addEdge(vertex1: string, vertex2: string): boolean {
    const v1 = this.vertices.get(vertex1);
    const v2 = this.vertices.get(vertex2);

    if (!v1 || !v2) {
      console.error(`One or both vertices not found: ${vertex1}, ${vertex2}`);
      return false;
    }

    if (!v1.edges.includes(vertex2)) {
      v1.edges.push(vertex2);
    }

    if (!v2.edges.includes(vertex1)) {
      v2.edges.push(vertex1);
    }

    return true;
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let graph = new Graph();
  let trailHeads = new Map();
  let peaks = new Map();

  // Create Vertexes
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const key = `${i},${j}`;
      const value = parseInt(input[i][j]);
      graph.addVertex(key, input[i][j]);

      if (value === 0) {
        trailHeads.set(key, []);
      } else if (value === 9) {
        peaks.set(key, []);
      }
    }
  }

  // Create Edges
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (j < input[0].length - 1) {
        const vertex1 = `${i},${j}`;
        const vertex2 = `${i},${j + 1}`;
        graph.addEdge(vertex1, vertex2);
      }

      if (i > 0) {
        const vertex1 = `${i},${j}`;
        const vertex2 = `${i - 1},${j}`;
        graph.addEdge(vertex1, vertex2);
      }
    }
  }

  trailHeads.forEach((trailhead, point) => {
    let th = trailHeads.get(point);
    console.log("Trailhead: ", point);
    let search_queue = [];
    search_queue.push(point);

    let count = 0;
    while (search_queue.length > 0 && count < 10000) {
      let vertix = search_queue.shift();

      let v1 = graph.vertices.get(vertix);
      if (v1) {
        if (parseInt(v1.value) === 9 && !th.includes(vertix)) {
          console.log("Peak Found", vertix);
          th.push(vertix);
          // return true;
        } else {
          for (const vertice of v1?.edges) {
            let neighbor = graph.vertices.get(vertice);
            if (neighbor) {
              if (parseInt(v1.value) + 1 === parseInt(neighbor.value)) {
                search_queue.push(vertice);
              }
            }
          }
        }
        count += 1;
      }
    }
    return false;
  });

  // console.log(graph.vertices);
  console.log("TrailHeads", trailHeads);
  // console.log("Peaks", peaks);

  let total = 0;
  for (const [key, values] of trailHeads.entries()) {
    total += values.length;
  }

  return total.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
0123
1234
8765
9876`,
        expected: "1",
      },
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: "36",
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
  onlyTests: false,
});
