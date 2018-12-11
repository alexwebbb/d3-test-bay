/*
 *    main.js
 */
// import * as d3 from "d3.min.js";

const margin = { top: 20, right: 100, bottom: 10, left: 100 },
  width = 600 - margin.right - margin.left,
  height = 400 - margin.top - margin.bottom;

d3.json("data/revenues.json").then(function(data) {
  const g = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"),
    x = d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.2),
    y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data.map(d => {
            return d.revenue;
          })
        )
      ])
      .range([height, 0]),
    xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y).tickFormat(d => {
      return "$" + d;
    }),
    rects = g.selectAll("rect").data(data);

  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

  //   data.forEach(d => {});
  rects
    .enter()
    .append("rect")
    .attr("x", d => {
      return x(d.month);
    })
    .attr("y", d => {
      return y(d.revenue);
    })
    .attr("height", d => {
      return height - y(d.revenue);
    })
    .attr("width", x.bandwidth)
    .attr("fill", "grey");
});
