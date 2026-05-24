
const getHighestNumber = (array) => {
  // flatten array of arrays of numbers into an array of finite numbers
  const flattened = []
    .concat.apply([], array)
    .filter((value) => Number.isFinite(value))
  // return the highest number
  return Math.max.apply(null, flattened.length > 0 ? flattened : [1])
}

const NPM_COLOR = '#cd3731'
const YARN_COLOR = '#248ebd'
const YARN_CLASSIC_COLOR = '#16a34a'
const YARN_PNP_COLOR = '#40a9ff'
const PNPM_COLOR = '#fbae00'
const PNPM_RUST_COLOR = '#8e44ad'
const BUN_COLOR = '#ff6b00'

const PM_COLORS = {
  npm: NPM_COLOR,
  pnpm: PNPM_COLOR,
  pnpm_rust: PNPM_RUST_COLOR,
  yarn: YARN_COLOR,
  yarn_pnp: YARN_PNP_COLOR,
  yarn_classic: YARN_CLASSIC_COLOR,
  bun: BUN_COLOR,
}

export default (
  resultArrays,
  pms,
  tests,
  formattedNow,
  chartTitle = 'Package Manager Benchmarks',
  chartSubtitle = ''
) => {
  let svgStr = ''
  // colors taken from logos (where possible)
  const colors = pms.map((pm, index) => PM_COLORS[pm.scenario] || PM_COLORS[pm.name] || Object.values(PM_COLORS)[index] || '#888')
  // empty areas next to the graph
  const offset = {
    left: 40,
    right: 10,
    top: 48,
    bottom: 10
  }
  // thickness of bars
  const thickness = 6
  // spacing between bars
  const spacing = 0.5
  // spacing between groups of bars
  const separation = 4
  // rectangle in which the graph will be drawn
  const graph = {
    x: offset.left,
    y: offset.top,
    w: 250,
    h: tests.length * pms.length * (thickness + spacing) +
      (tests.length - 1) * separation +
      separation * 2 // extra white space above first bar and below last bar
  }
  // viewbox dimensions
  const vb = {
    x: 0,
    y: 0,
    w: graph.w +
      offset.left +
      offset.right,
    h: graph.h + offset.top + offset.bottom
  }
  // get the highest number of the results so
  // that the graph can be scaled accordingly
  const max = getHighestNumber(resultArrays)
  // upper limit of graph is the highest result rounded
  // up to the nearest number divisible by 5
  const limit = Math.ceil(max / 5) * 5
  const ratio = graph.w / limit
  const styles = {
    font: '.font { font-family: sans-serif; }',
    s3: '.s3 { font-size: 3px; }',
    s4: '.s4 { font-size: 4px; }',
    s5: '.s5 { font-size: 5px; }',
    s6: '.s6 { font-size: 6px; }',
    title: '.title { fill: #222; font-weight: 600; }',
    line: '.line { stroke: #cacaca; }',
    lineMinor: '.lineMinor { stroke: #e6e6e6; }',
    width: '.width { stroke-width: 0.5; }',
    text: '.text { fill: #888; }'
  }

  svgStr += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" '
  svgStr += `viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">` + '\n'

  // add styles
  svgStr += '  <style>' + '\n'
  Object.values(styles).forEach((style) => {
    svgStr += `    ${style}` + '\n'
  })
  svgStr += '  </style>' + '\n'

  // add white background
  svgStr += `  <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="${'#fff'}"></rect>` + '\n'

  // uncomment to color the entire view box for debugging
  // svgStr += `<rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="${'#eaeaea'}"></rect>` + '\n'

  // add chart title
  ;(() => {
    const x = graph.x
    const y = vb.y + 6
    svgStr += `  <text x="${x}" y="${y}" class="font s6 title">${chartTitle}</text>` + '\n'

    if (chartSubtitle) {
      svgStr += `  <text x="${x}" y="12" class="font s3 text">${chartSubtitle}</text>` + '\n'
    }
  })()

  // draw legend
  pms.forEach((pm, index) => {
    const itemsPerRow = pms.length
    const row = Math.floor(index / itemsPerRow)
    const col = index % itemsPerRow
    // draw colored circle
    const radius = 4
    const colWidth = (graph.w - 8) / itemsPerRow
    const x = graph.x + 4 + (col * colWidth) + colWidth / 2
    const y = vb.y + radius + 13 + (row * 13)
    svgStr += `  <circle cx="${x}" cy="${y}" r="${radius}" fill="${colors[index]}"></circle>` + '\n'

    // add name under circle
    const anchor = 'middle'
    let textY = y + radius + 4
    svgStr += `  <text x="${x}" y="${textY}" class="font s4" text-anchor="${anchor}">${pm.legend}</text>` + '\n'

    // add version under name
    const text = pm.version === 'n/a' ? 'n/a' : `v${pm.version}`
    textY += 4
    svgStr += `  <text x="${x}" y="${textY}" class="font s3" text-anchor="${anchor}">${text}</text>` + '\n'
  })

  const graphLineCount = 11
  const graphLines = Array.from({ length: graphLineCount }, (_, index) => {
    const progress = index / (graphLineCount - 1)
    return graph.x + limit * ratio * progress
  })
  let baseGraphLine = ''

  // draw graph lines
  graphLines.forEach((graphLine, index) => {
    const isBaseLine = index === 0
    const isMajorLine = index % 2 === 0
    const compositeClass = isBaseLine
      ? 'line'
      : isMajorLine
        ? 'line width'
        : 'lineMinor width'
    const y1 = graph.y - separation
    const y2 = y1 + graph.h
    const line = `  <line x1="${graphLine}" y1="${y1}" x2="${graphLine}" y2="${y2}" class="${compositeClass}"></line>` + '\n'
    // add base graph line after the bars are drawn so that it is drawn over the bars
    if (isBaseLine) {
      baseGraphLine = line
    } else {
      svgStr += line
    }

    // add numbers above the graph lines
    const anchor = 'middle'
    const x = graphLine
    let y = graph.y - 7
    const number = limit * (index / (graphLines.length - 1))
    svgStr += `  <text x="${x}" y="${y}" class="font s4 text" text-anchor="${anchor}">${number}</text>` + '\n'

    // add numbers below the graph lines
    y = y2 + 5
    svgStr += `  <text x="${x}" y="${y}" class="font s4 text" text-anchor="${anchor}">${number}</text>` + '\n'
  })

  // draw results as bars
  resultArrays.forEach((results, indexA) => {
    results.forEach((result, indexR) => {
      const roundedCorners = 1
      const y = graph.y +
        ((thickness + spacing) * indexR) +
        (((thickness + spacing) * pms.length + separation) * indexA)
      const length = Math.round(result * ratio)
      const x = graph.x
      if (Number.isFinite(result)) {
        svgStr += `  <rect x="${x}" y="${y}" width="${length === 0 ? 1 : length}" height="${thickness}" fill="${colors[indexR]}" rx="${roundedCorners}" ry="${roundedCorners}"></rect>` + '\n'
      } else {
        svgStr += `  <rect x="${x}" y="${y}" width="3" height="${thickness}" fill="#b0b0b0" rx="${roundedCorners}" ry="${roundedCorners}"></rect>` + '\n'
        svgStr += `  <text x="${x + 5}" y="${y + (thickness / 2)}" class="font s4 text" dominant-baseline="middle">n/a</text>` + '\n'
      }
    })
  })

  // draw base graph line over the bars
  svgStr += baseGraphLine

  // next to each bar group specify the properties of the test
  tests.forEach((properties, indexT) => {
    properties.forEach((property, indexP) => {
      const baseline = 'middle'
      const anchor = 'end'
      const ySpacing = 4
      const x = graph.x - 2
      const y = graph.y +
        // get starting y position of bar group
        ((thickness + spacing) * pms.length + separation) * indexT +
        // go to center of middle bar
        thickness + spacing + thickness / 2 -
        // get y position for property based on how many properties there are
        ((properties.length - (indexP + 1)) / 2) * ySpacing +
        ySpacing * indexP / 2
      svgStr += `  <text x="${x}" y="${y}" class="font s4" dominant-baseline="${baseline}" text-anchor="${anchor}">${property}</text>` + '\n'
    })
  })

  // add node version
  ;(() => {
    const text = `Tests were run using Node.js ${process.version} at: ${formattedNow}`
    const anchor = 'end'
    const x = graph.x + graph.w
    const y = vb.h - 2
    svgStr += `  <text x="${x}" y="${y}" class="font s4 text" text-anchor="${anchor}">${text}</text>` + '\n'
  })()

  svgStr += `</svg>` + '\n'

  return svgStr
}
