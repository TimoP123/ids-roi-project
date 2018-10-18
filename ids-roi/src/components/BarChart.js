import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  
  render() {
    const { electricityPrice, width, height, costs } = this.props;
    console.log("BarChart rendered", electricityPrice);
    d3.selectAll("svg > *").remove();
    d3.selectAll("svg").remove();

    const svg = d3
      .select(".graphs")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 40);

    svg
      .selectAll("rect")
      .data(costs)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 50)
      .attr("y", (d, i) => height - 5 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    return <div id={"#asdf"} />;
  }
}

export default BarChart;
