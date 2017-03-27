/* global d3 */

// Our canvas
const width = 1000,
    height = 300,
    margin = 20,
    marginLeft = 40

// Drawing area

let svg = d3.select('#results')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .style('padding', 20)

// Data reloading
let reload = () => {
    d3.tsv("afcw-results.tsv", function (data) {
        let goals = data.map(item => {
            return item.GoalsScored
        })
        console.log(goals);
        redraw(goals)
    });
}

// redraw function
let redraw = (data) => {
    // Your data to graph here
    var max = _.max(data)
    var yScale = d3.scaleLinear()
        .domain([0, max])
        .range([0, 300]);

    var xAxisScale = d3.scaleLinear()
        .domain([1, data.length])
        .range([0, 1000]);

    var yAxisScale = d3.scaleLinear()
        .domain([max, 0])
        .range([0, 300]);

    var xAxis = d3.axisBottom()
        .scale(xAxisScale)
        .ticks(data.length)

    var yAxis = d3.axisLeft()
        .scale(yAxisScale)
        .ticks(4)

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, index) => {
            return index * 22
        })
        .attr('y', (d) => {
            return 300 - yScale(d)
        })
        .attr('width', 10)
        .attr('height', (d) => {
            return yScale(d)
        })

    svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(0," + height + ")")

    svg.append("g")
        .call(yAxis)
        .attr("transform", "translate(5,0)")
}

reload()
