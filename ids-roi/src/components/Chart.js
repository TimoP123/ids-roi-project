import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  render() {
    const { data } = this.props;

    console.log("Chart", data);
    return (
      <div className="chart">
        <Line data={data} />
      </div>
    );
  }
}

export default Chart;
