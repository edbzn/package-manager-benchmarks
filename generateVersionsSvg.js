import path from "path";
import fs, { cpSync } from "fs";
import { loadYamlFile } from "load-yaml-file";
import { fileURLToPath } from "url";
import prettyMs from "pretty-ms";
import { rcompare } from "semver";

const getHighestNumber = (array) => {
  let highest = 0;
  for (const [version, results] of array) {
    for (const result of Object.values(results)) {
      if (result > highest) highest = result;
    }
  }
  return highest;
};

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const BENCH = path.join(DIRNAME, "results");

const getPMDir = (pm) => path.join(BENCH, pm);

const tests = [
  "firstInstall",
  "repeatInstall",
  "withWarmCacheAndLockfile",
  "withWarmCache",
  "withLockfile",
  "withWarmCacheAndModules",
  "withWarmModulesAndLockfile",
  "withWarmModules",
  "updatedDependencies",
];

const testDescriptions = [
  [
    // firstInstall
    "clean install",
  ],
  [
    // repeatInstall
    "cache",
    "lockfile",
    "node_modules",
  ],
  [
    // withWarmCacheAndLockfile
    "cache",
    "lockfile",
  ],
  [
    // withWarmCache
    "cache",
  ],
  [
    // withLockfile
    "lockfile",
  ],
  [
    // withWarmCacheAndModules
    "cache",
    "node_modules",
  ],
  [
    // withWarmModulesAndLockfile
    "node_modules",
    "lockfile",
  ],
  [
    // withWarmModules
    "node_modules",
  ],
  [
    // updatedDependencies
    "update",
  ],
];

function min(benchmarkResults) {
  const results = {};
  tests.forEach((test) => {
    results[test] = Math.min.apply(
      Math,
      benchmarkResults.map((res) => res[test])
    );
  });

  return results;
}

const getPMResults = async (pm) => {
  const results = [];
  const pmDir = getPMDir(pm);
  // each test is a directory
  const versions = fs.readdirSync(pmDir);
  for (const version of versions) {
    const testDir = path.join(pmDir, version);
    // read alotta-files.yaml results
    const resultYml = path.join(testDir, "alotta-files.yaml");
    // if the file doesn't exist, skip it
    if (!fs.existsSync(resultYml)) continue;
    // get version from dir name
    const result = min(await loadYamlFile(resultYml));
    results.push([version, result]);
  }
  return results;
};

const PMS = ["npm", "pnpm", "yarn", "yarn_pnp", "bun"];
const now = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date());

for (const pm of PMS) {
  getPMResults(pm).then((results) => {
    const svg = generateSvg(
      results.sort((a, b) => rcompare(a, b)),
      pm,
      testDescriptions,
      now
    );
    // write svg to disk
    fs.writeFileSync(path.join(DIRNAME, "results", "img", `${pm}.svg`), svg);
  });
}

const generateSvg = (resultArrays, pm, tests, formattedNow) => {
  let svgStr = "";

  // empty areas next to the graph
  const offset = {
    left: 46,
    right: 10,
    top: 10,
    bottom: 5,
  };
  // thickness of bars
  const thickness = 4;
  // spacing between bars
  const spacing = 1.5;
  // spacing between groups of bars
  const separation = 9;
  // rectangle in which the graph will be drawn

  // get the highest number of the results so
  // that the graph can be scaled accordingly
  const max = getHighestNumber(resultArrays);

  const graph = {
    x: offset.left,
    y: offset.top,
    w: 250,
    h:
      tests.length * resultArrays.length * (thickness + spacing) +
      (resultArrays.length - 1) * separation +
      separation * 2, // extra white space above first bar and below last bar
  };
  // viewbox dimensions
  const vb = {
    x: 0,
    y: 0,
    w: graph.w + offset.left + offset.right,
    h: graph.h + offset.top + offset.bottom,
  };

  // upper limit of graph is the highest result rounded
  // up to the nearest number divisible by 5
  const limit = Math.ceil(max / 5) * 5;
  const ratio = graph.w / limit;
  const styles = {
    font: ".font { font-family: sans-serif; }",
    s2: ".s2 { font-size: 2px; }",
    s3: ".s3 { font-size: 3px; }",
    s4: ".s4 { font-size: 4px; }",
    s5: ".s5 { font-size: 5px; }",
    line: ".line { stroke: #cacaca; }",
    width: ".width { stroke-width: 0.5; }",
    text: ".text { fill: #888; }",
    bold: ".bold { font-weight: bold; }",
  };

  svgStr += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ';
  svgStr += `viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">` + "\n";

  // add styles
  svgStr += "  <style>" + "\n";
  Object.values(styles).forEach((style) => {
    svgStr += `    ${style}` + "\n";
  });
  svgStr += "  </style>" + "\n";

  // add white background
  svgStr +=
    `  <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${
      vb.h
    }" fill="${"#fff"}"></rect>` + "\n";

  // create graphLines based on the resultArrays
  const graphLines = [];
  const colors = [];
  resultArrays.forEach(([version, results], index) => {
    const color = `hsl(${(index * 360) / resultArrays.length}, 100%, 45%)`;

    colors.push(color);

    Object.values(results).forEach((result) => {
      const length = Math.round(result * ratio);
      const x = graph.x + length;
      graphLines.push(x);
    });
  });

  // draw results as bars
  resultArrays.forEach(([version, results], indexA) => {
    Object.values(results).forEach((result, indexR) => {
      const roundedCorners = 1;
      const y =
        graph.y +
        (thickness + spacing) * indexR +
        ((thickness + spacing) * tests.length + separation) * indexA;

      const length = Math.round(result * ratio);
      const x = graph.x;

      if (!Number.isNaN(result)) {
        svgStr +=
          `  <rect x="${x}" y="${y}" width="${
            length === 0 ? 1 : length
          }" height="${thickness}" fill="${
            colors[indexA]
          }" rx="${roundedCorners}" ry="${roundedCorners}"></rect>` + "\n";
        // contrasted text color
        const textColor = `hsl(${
          (indexA * 360) / resultArrays.length
        }, 100%, 20%)`;
        svgStr +=
          `  <text x="${x + length + 2}" y="${
            y + thickness / 2
          }" fill="${textColor}" dominant-baseline="middle" class="font s4">${prettyMs(
            result
          )}</text>` + "\n";
      } else {
        svgStr +=
          `  <text x="${x}" y="${
            y + thickness / 2
          }" dominant-baseline="middle" class="font s4">n/a</text>` + "\n";
      }
    });
  });

  // next to each bar group specify the properties of the test
  resultArrays.forEach(([version, results], indexT) => {
    Object.values(results).forEach((result, indexP) => {
      const baseline = "middle";
      const anchor = "end";
      const x = graph.x - 2;

      const y =
        graph.y +
        (thickness + spacing) * indexP +
        ((thickness + spacing) * tests.length + separation) * indexT +
        thickness / 2;

      if (indexP === 0) {
        svgStr +=
          `  <text x="${x + 4}" y="${
            y - (thickness + spacing)
          }" class="font s5" dominant-baseline="${baseline}" text-anchor="start">${pm} v${version}</text>` +
          "\n";
      }

      svgStr +=
        `  <text x="${x}" y="${y}" class="font s4" dominant-baseline="${baseline}" text-anchor="${anchor}">${tests[
          indexP
        ].join(" + ")}</text>` + "\n";
    });
  });

  // add node version
  (() => {
    const text = `Tests were run using ${pm} with Node.js ${process.version} at: ${formattedNow}`;
    const anchor = "end";
    const x = graph.x + graph.w;
    const y = vb.h - 2;
    svgStr +=
      `  <text x="${x}" y="${y}" class="font s4 text" text-anchor="${anchor}">${text}</text>` +
      "\n";
  })();

  svgStr += `</svg>` + "\n";

  return svgStr;
};
