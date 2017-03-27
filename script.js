/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')
  .style('padding', '20px')

// Data reloading
let reload = () => {
  d3.tsv('afcw-results.tsv', (rows) => {
    let dataset = []
    rows.map((row) => {
      dataset.push(row.GoalsScored)
    })

    redraw(dataset)
  })
}

// redraw function
let redraw = (dataset) => {
  // Y Scaling
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, height])
  // X Scaling
  const xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, width])
  // Coloring
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(['blue', 'teal'])

  var xAxis = d3.axisBottom(xScale).ticks(dataset.length)
  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0,${height})`)

  var yAxis = d3.axisLeft(yScale).ticks(width)
  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(0, ${width})`)

  svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (data, index) => {
    return xScale(index)
  })
  .attr('y', (data) => {
    return 300 - yScale(data)
  })
  .attr('width', 15)
  .attr('height', (data) => {
    return yScale(data)
  })
  .attr('fill', colorScale)
}

reload()
