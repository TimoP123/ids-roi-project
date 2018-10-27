import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  render() {
    const { data } = this.props;

    const options = {
      maintainAspectRatio: false
    };

    console.log("Chart", data);

    if (data.length === 0) {
      return <div>Too much points to show...</div>;
    }

    return (
      <div className="chart">
        <Line data={data} options={options} height={400} />
      </div>
    );
  }
}

export default Chart;
