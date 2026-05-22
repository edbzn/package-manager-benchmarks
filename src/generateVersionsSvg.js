import fs from "fs";
import path from "path";
import { loadYamlFile } from "load-yaml-file";
import { fileURLToPath } from "url";
import { pms as PMS } from "./config.js";
import cmdsMap from "./commandsMap.js";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = path.join(DIRNAME, "../results");
const IMG_DIR = path.join(RESULTS_DIR, "img");
const FIXTURE = "alotta-files";
const METRIC = "firstInstall";

const PM_COLORS = {
  npm: "#cd3731",
  pnpm: "#fbae00",
  pnpm_rust: "#8e44ad",
  yarn: "#248ebd",
  yarn_pnp: "#40a9ff",
  yarn_classic: "#16a34a",
  bun: "#ff6b00",
};

const semverRegex = /(\d+)\.(\d+)\.(\d+)(?:[-+][0-9A-Za-z.-]+)?/;

function extractSemverParts(version) {
  const match = String(version).match(semverRegex);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function compareVersionsDesc(a, b) {
  const pa = extractSemverParts(a);
  const pb = extractSemverParts(b);
  if (pa && pb) {
    if (pb.major !== pa.major) return pb.major - pa.major;
    if (pb.minor !== pa.minor) return pb.minor - pa.minor;
    if (pb.patch !== pa.patch) return pb.patch - pa.patch;
    return String(b).localeCompare(String(a));
  }
  if (pa) return -1;
  if (pb) return 1;
  return String(b).localeCompare(String(a), undefined, { numeric: true, sensitivity: "base" });
}

function min(results, metric) {
  const values = results
    .map((entry) => entry?.[metric])
    .filter((value) => Number.isFinite(value));
  return values.length === 0 ? NaN : Math.min(...values);
}

async function getPMMajorSeries(pm) {
  const pmDir = path.join(RESULTS_DIR, pm);
  if (!fs.existsSync(pmDir)) return [];

  const byMajor = new Map();
  const versions = fs.readdirSync(pmDir).sort(compareVersionsDesc);

  for (const version of versions) {
    const parts = extractSemverParts(version);
    if (!parts) continue;
    if (byMajor.has(parts.major)) continue;

    const yamlPath = path.join(pmDir, version, `${FIXTURE}.yaml`);
    if (!fs.existsSync(yamlPath)) continue;

    try {
      const data = await loadYamlFile(yamlPath);
      if (!Array.isArray(data) || data.length === 0) continue;

      const value = min(data, METRIC);
      if (!Number.isFinite(value)) continue;

      byMajor.set(parts.major, { major: parts.major, version, value });
    } catch {
      continue;
    }
  }

  return [...byMajor.values()].sort((a, b) => a.major - b.major);
}

function formatSeconds(ms) {
  return (ms / 1000).toFixed(1);
}

function generateCombinedSvg(seriesByPm, majors, formattedNow) {
  const allValues = Object.values(seriesByPm)
    .flatMap((series) => series.map((point) => point.value))
    .filter((value) => Number.isFinite(value));

  const maxValue = allValues.length ? Math.max(...allValues) : 1;
  const yLimit = Math.ceil((maxValue / 1000) / 5) * 5 * 1000;

  const margin = { top: 30, right: 20, bottom: 38, left: 48 };
  const width = 860;
  const height = 380;
  const graphX = margin.left;
  const graphY = margin.top;
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;
  const majorCount = Math.max(majors.length, 2);

  const xOf = (major) => {
    if (majorCount === 1) return graphX + graphW / 2;
    const index = majors.indexOf(major);
    return graphX + (index / (majorCount - 1)) * graphW;
  };

  const yOf = (value) => graphY + graphH - (value / yLimit) * graphH;

  let svg = "";
  svg += `<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 ${width} ${height}\">\n`;
  svg += "  <style>\n";
  svg += "    .font { font-family: sans-serif; }\n";
  svg += "    .s3 { font-size: 10px; }\n";
  svg += "    .s4 { font-size: 12px; }\n";
  svg += "    .s5 { font-size: 14px; }\n";
  svg += "    .grid { stroke: #e0e0e0; stroke-width: 1; }\n";
  svg += "    .axis { stroke: #b0b0b0; stroke-width: 1; }\n";
  svg += "    .text { fill: #666; }\n";
  svg += "    .title { fill: #222; font-weight: 600; }\n";
  svg += "  </style>\n";

  svg += `  <rect x=\"0\" y=\"0\" width=\"${width}\" height=\"${height}\" fill=\"#fff\"></rect>\n`;
  svg += `  <text x=\"${graphX}\" y=\"16\" class=\"font s5 title\">Major Version Trends Across Package Managers</text>\n`;
  svg += `  <text x=\"${graphX}\" y=\"27\" class=\"font s3 text\">Metric: clean install (firstInstall), fixture: ${FIXTURE}, absolute scale shared by all PMs</text>\n`;

  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const value = (i / yTicks) * yLimit;
    const y = yOf(value);
    svg += `  <line x1=\"${graphX}\" y1=\"${y}\" x2=\"${graphX + graphW}\" y2=\"${y}\" class=\"grid\"></line>\n`;
    svg += `  <text x=\"${graphX - 6}\" y=\"${y + 3}\" class=\"font s3 text\" text-anchor=\"end\">${formatSeconds(value)}s</text>\n`;
  }

  majors.forEach((major) => {
    const x = xOf(major);
    svg += `  <line x1=\"${x}\" y1=\"${graphY}\" x2=\"${x}\" y2=\"${graphY + graphH}\" class=\"grid\"></line>\n`;
    svg += `  <text x=\"${x}\" y=\"${graphY + graphH + 14}\" class=\"font s3 text\" text-anchor=\"middle\">v${major}</text>\n`;
  });

  svg += `  <line x1=\"${graphX}\" y1=\"${graphY}\" x2=\"${graphX}\" y2=\"${graphY + graphH}\" class=\"axis\"></line>\n`;
  svg += `  <line x1=\"${graphX}\" y1=\"${graphY + graphH}\" x2=\"${graphX + graphW}\" y2=\"${graphY + graphH}\" class=\"axis\"></line>\n`;

  PMS.forEach((pm) => {
    const series = seriesByPm[pm] || [];
    if (series.length === 0) return;
    const color = PM_COLORS[pm] || "#666";
    const points = series.map((point) => `${xOf(point.major)},${yOf(point.value)}`).join(" ");
    svg += `  <polyline fill=\"none\" stroke=\"${color}\" stroke-width=\"2\" points=\"${points}\"></polyline>\n`;

    series.forEach((point) => {
      const x = xOf(point.major);
      const y = yOf(point.value);
      svg += `  <circle cx=\"${x}\" cy=\"${y}\" r=\"2.8\" fill=\"${color}\"></circle>\n`;
    });
  });

  const legendStartX = graphX;
  const legendY = graphY + graphH + 26;
  const legendWidth = graphW / Math.max(PMS.length, 1);
  PMS.forEach((pm, index) => {
    const x = legendStartX + index * legendWidth + 4;
    const color = PM_COLORS[pm] || "#666";
    const label = cmdsMap[pm]?.legend || pm;
    svg += `  <circle cx=\"${x}\" cy=\"${legendY}\" r=\"3\" fill=\"${color}\"></circle>\n`;
    svg += `  <text x=\"${x + 6}\" y=\"${legendY + 1}\" class=\"font s3\" dominant-baseline=\"middle\">${label}</text>\n`;
  });

  svg += `  <text x=\"${graphX + graphW}\" y=\"${height - 4}\" class=\"font s3 text\" text-anchor=\"end\">Node.js ${process.version} · ${formattedNow}</text>\n`;
  svg += "</svg>\n";

  return svg;
}

async function run() {
  await fs.promises.mkdir(IMG_DIR, { recursive: true });

  const now = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const seriesEntries = await Promise.all(
    PMS.map(async (pm) => [pm, await getPMMajorSeries(pm)])
  );
  const seriesByPm = Object.fromEntries(seriesEntries);

  const majors = [...new Set(Object.values(seriesByPm).flatMap((series) => series.map((point) => point.major)))].sort(
    (a, b) => a - b
  );

  const svg = generateCombinedSvg(seriesByPm, majors, now);
  await fs.promises.writeFile(path.join(IMG_DIR, "version-trends.svg"), svg, "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
