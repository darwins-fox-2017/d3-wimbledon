/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 400)
 .style('background', '#cacaca')

const mouseover = (d, i) => {
  debugger
}

// Data reloading
let reload = () => {
  // Your data parsing here...

  d3.tsv('afcw-results.tsv', (error, rows) => {
    if (error) throw error;
      redraw(rows);
  })
}

// redraw function
let redraw = (data) => {
  let goalScored = []
  data.forEach(function (res) {
    goalScored.push(res.GoalsScored)
  })

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(goalScored)])
  .range([0, 400])

  const xScale = d3.scaleLinear()
  .domain([0, goalScored.length])
  .range([0, 1000])

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(goalScored)])
  .range(['peru', 'blue'])

  const xAxis = d3.axisBottom(xScale)
        .ticks(goalScored.length)

  svg.append("g")
      .attr("transform", "translate(0, 1000)")
      .call(xAxis)

  // Your data to graph here
  svg.selectAll('rect')
    .data(goalScored)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('y', (d) => {
      return 400 - yScale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', colorScale)
    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', '#bada55')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d))
    })

}

reload()
