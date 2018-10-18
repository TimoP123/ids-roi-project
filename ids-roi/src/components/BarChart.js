import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  /*
  componentDidMount() {
    this.drawChart([3, 4, 5]);
  }

  componentWillReceiveProps(props) {
    const { electricityPrice } = this.props;
    if (props.electricityPrice !== electricityPrice) {
      const context = d3.select(".graphs");
      context.remove();
      this.drawChart(props.costs);
    }
  }
  */

  drawChart(costs) {
    const { electricityPrice, width, height } = this.props;
    console.log("drawChart", electricityPrice, width, height, costs);

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
  }

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
