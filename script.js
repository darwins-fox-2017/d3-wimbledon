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
    .style('background', '#FAFAFA')



// Data reloading
let reload = () => {
    // Your data parsing here...
    d3.tsv('afcw-results.tsv', (rows) => {
        console.log(rows);
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
        .range([0, 300])

    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => {
            return i * 20
        })
        .attr('y', (d) => {
            console.log('isi day', d);
            return 300 - yScale(d)
        })
        .attr('width', 20)
        .attr('height', (d) => {
            return yScale(d)
        })
        .attr('fill', '#2196F3')
}

reload()
