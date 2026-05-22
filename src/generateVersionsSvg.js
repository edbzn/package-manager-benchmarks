import path from "path";
import fs from "fs";
import { loadYamlFile } from "load-yaml-file";
import { fileURLToPath } from "url";
import prettyMs from "pretty-ms";
import { rcompare } from "semver";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const BENCH = path.join(DIRNAME, "../results");

const getPMDir = (pm) => path.join(BENCH, pm);

import { tests, testDescriptionsFlat as testDescriptions } from "./config.js";

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
  if (!fs.existsSync(pmDir)) return results;
  const versions = fs.readdirSync(pmDir);
  for (const version of versions) {
    const testDir = path.join(pmDir, version);
    const resultYml = path.join(testDir, "alotta-files.yaml");
    if (!fs.existsSync(resultYml)) continue;
    const result = min(await loadYamlFile(resultYml));
    results.push([version, result]);
  }
  return results;
};

/**
 * Compute deltas between consecutive versions (oldest to newest).
 * Returns array of { label, deltas } where deltas is an object { testName: deltaMs }.
 * Positive delta = regression (slower), negative delta = improvement (faster).
 */
function computeDeltas(sortedResults) {
  // sortedResults is sorted newest first (rcompare), reverse to oldest first
  const chronological = [...sortedResults].reverse();
  const deltaResults = [];

  for (let i = 1; i < chronological.length; i++) {
    const [prevVersion, prevResults] = chronological[i - 1];
    const [currVersion, currResults] = chronological[i];
    const deltas = {};

    tests.forEach((test) => {
      const prev = prevResults[test];
      const curr = currResults[test];
      if (Number.isFinite(prev) && Number.isFinite(curr)) {
        deltas[test] = curr - prev;
      } else {
        deltas[test] = NaN;
      }
    });

    deltaResults.push({
      label: `v${prevVersion} → v${currVersion}`,
      deltas,
    });
  }

  return deltaResults;
}

import { pms as PMS } from "./config.js";
const now = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date());

for (const pm of PMS) {
  getPMResults(pm).then((results) => {
    if (results.length < 2) return;
    const sorted = results.sort(([a], [b]) => rcompare(a, b));
    const deltas = computeDeltas(sorted);
    if (deltas.length === 0) return;
    const svg = generateDeltaSvg(deltas, pm, testDescriptions, now);
    fs.writeFileSync(path.join(DIRNAME, "../results", "img", `${pm}.svg`), svg);
  });
}

const IMPROVEMENT_COLOR = "#16a34a"; // green
const REGRESSION_COLOR = "#dc2626"; // red

const generateDeltaSvg = (deltaResults, pm, testDescs, formattedNow) => {
  let svgStr = "";

  const offset = {
    left: 70,
    right: 40,
    top: 14,
    bottom: 5,
  };
  const thickness = 4;
  const spacing = 1.5;
  const separation = 9;

  // find the max absolute delta to scale the chart
  let maxAbsDelta = 0;
  for (const { deltas } of deltaResults) {
    for (const val of Object.values(deltas)) {
      if (Number.isFinite(val) && Math.abs(val) > maxAbsDelta) {
        maxAbsDelta = Math.abs(val);
      }
    }
  }
  // ensure a minimum scale
  if (maxAbsDelta === 0) maxAbsDelta = 1000;

  const graph = {
    x: offset.left,
    y: offset.top,
    w: 220,
    h:
      testDescs.length * deltaResults.length * (thickness + spacing) +
      (deltaResults.length - 1) * separation +
      separation * 2,
  };

  // center line is in the middle of the graph width
  const centerX = graph.x + graph.w / 2;

  const vb = {
    x: 0,
    y: 0,
    w: graph.w + offset.left + offset.right,
    h: graph.h + offset.top + offset.bottom,
  };

  const limit = Math.ceil(maxAbsDelta / 1000) * 1000; // round up to nearest second
  const halfWidth = graph.w / 2;
  const ratio = halfWidth / limit;

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

  svgStr += "  <style>" + "\n";
  Object.values(styles).forEach((style) => {
    svgStr += `    ${style}` + "\n";
  });
  svgStr += "  </style>" + "\n";

  // white background
  svgStr +=
    `  <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="#fff"></rect>` +
    "\n";

  // draw grid lines
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++) {
    const fraction = i / gridSteps;

    // right side (regression)
    const xRight = centerX + halfWidth * fraction;
    const val = Math.round((limit * fraction) / 1000);
    if (i > 0) {
      svgStr +=
        `  <line x1="${xRight}" y1="${graph.y - separation}" x2="${xRight}" y2="${
          graph.y + graph.h - separation
        }" class="line width"></line>` + "\n";
    }
    svgStr +=
      `  <text x="${xRight}" y="${graph.y - 3}" class="font s3 text" text-anchor="middle">+${val}s</text>` +
      "\n";

    // left side (improvement)
    if (i > 0) {
      const xLeft = centerX - halfWidth * fraction;
      svgStr +=
        `  <line x1="${xLeft}" y1="${graph.y - separation}" x2="${xLeft}" y2="${
          graph.y + graph.h - separation
        }" class="line width"></line>` + "\n";
      svgStr +=
        `  <text x="${xLeft}" y="${graph.y - 3}" class="font s3 text" text-anchor="middle">-${val}s</text>` +
        "\n";
    }
  }

  // draw center line (zero)
  svgStr +=
    `  <line x1="${centerX}" y1="${graph.y - separation}" x2="${centerX}" y2="${
      graph.y + graph.h - separation
    }" class="line"></line>` + "\n";
  svgStr +=
    `  <text x="${centerX}" y="${graph.y - 3}" class="font s3 text" text-anchor="middle">0</text>` +
    "\n";

  // draw axis labels
  svgStr +=
    `  <text x="${centerX - halfWidth}" y="${graph.y - 7}" class="font s3 text" text-anchor="start" font-style="italic">← faster (improvement)</text>` +
    "\n";
  svgStr +=
    `  <text x="${centerX + halfWidth}" y="${graph.y - 7}" class="font s3 text" text-anchor="end" font-style="italic">slower (regression) →</text>` +
    "\n";

  // draw delta bars
  deltaResults.forEach(({ label, deltas }, indexA) => {
    const deltaValues = Object.values(deltas);

    deltaValues.forEach((delta, indexR) => {
      const roundedCorners = 1;
      const y =
        graph.y +
        (thickness + spacing) * indexR +
        ((thickness + spacing) * testDescs.length + separation) * indexA;

      if (Number.isFinite(delta)) {
        const length = Math.abs(Math.round(delta * ratio));
        const color = delta <= 0 ? IMPROVEMENT_COLOR : REGRESSION_COLOR;
        const barX = delta <= 0 ? centerX - length : centerX;

        svgStr +=
          `  <rect x="${barX}" y="${y}" width="${
            length === 0 ? 1 : length
          }" height="${thickness}" fill="${color}" rx="${roundedCorners}" ry="${roundedCorners}"></rect>` +
          "\n";

        // add delta text label
        const textX = delta <= 0 ? barX - 2 : centerX + length + 2;
        const anchor = delta <= 0 ? "end" : "start";
        const sign = delta <= 0 ? "-" : "+";
        svgStr +=
          `  <text x="${textX}" y="${
            y + thickness / 2
          }" class="font s3" dominant-baseline="middle" text-anchor="${anchor}" fill="${color}">${sign}${prettyMs(
            Math.abs(delta)
          )}</text>` + "\n";
      } else {
        svgStr +=
          `  <text x="${centerX + 2}" y="${
            y + thickness / 2
          }" dominant-baseline="middle" class="font s3 text">n/a</text>` +
          "\n";
      }
    });
  });

  // version transition labels and test descriptions
  deltaResults.forEach(({ label, deltas }, indexT) => {
    const deltaValues = Object.values(deltas);

    deltaValues.forEach((delta, indexP) => {
      const y =
        graph.y +
        (thickness + spacing) * indexP +
        ((thickness + spacing) * testDescs.length + separation) * indexT +
        thickness / 2;

      if (indexP === 0) {
        svgStr +=
          `  <text x="${graph.x}" y="${
            y - (thickness + spacing)
          }" class="font s4 bold" dominant-baseline="middle" text-anchor="start">${label}</text>` +
          "\n";
      }

      svgStr +=
        `  <text x="${graph.x - 2}" y="${y}" class="font s3" dominant-baseline="middle" text-anchor="end">${testDescs[indexP]}</text>` +
        "\n";
    });
  });

  // footer
  (() => {
    const text = `Version trend deltas for ${pm} · Node.js ${process.version} · ${formattedNow}`;
    const x = graph.x + graph.w;
    const y = vb.h - 2;
    svgStr +=
      `  <text x="${x}" y="${y}" class="font s3 text" text-anchor="end">${text}</text>` +
      "\n";
  })();

  svgStr += `</svg>` + "\n";
  return svgStr;
};
