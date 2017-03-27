/* global d3 */

// Our canvas
const width = 750,
    height = 300,
    margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('padding', '100px 50px')
    .style('background', '#FAFAFA')
    .style('border', '1px solid black')

// Data reloading
let reload = () => {
    // Your data parsing here...
    d3.tsv('afcw-results.tsv', (rows) => {
        // console.log(rows);
        let dataset = []
        rows.map((row) => {
            dataset.push(row.GoalsScored)
        })
        redraw(dataset)
    })
}

// redraw function
let redraw = (dataset) => {
    // Your data to graph here
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, height])

    const xScale = d3.scaleLinear()
        .domain([dataset.length, 0])
        .range([width, 0])
    //

    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    svg.append('g')
       .call(yAxis)
       .attr('transform', 'translate(20, 0)')

    svg.append('g')
       .call(xAxis)
      //  .attr('transform', 'translate(0, 280)')


    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => {
            return i * 20
        })
        .attr('y', (d) => {
            return height - yScale(d)
        })
        .attr('width', 20)
        .attr('height', (d) => {
            return yScale(d)
        })
        .attr('fill', '#2196F3')
}

reload()
