import React, { Component } from "react";
//import "./Results.css";

class Results extends Component {
  render() {
    const {
      electricityPrice,
      yearConsumption,
      savings,
      roiTime,
      gshpOn
    } = this.props;

    const costsPerYear = Math.round(electricityPrice * yearConsumption);
    const costsWithGshp = Math.round(
      electricityPrice * (yearConsumption - savings)
    );

    return (
      <div className="results">
        <h3>Results</h3>
        <p>Electricity costs per year: {costsPerYear} €</p>
        {gshpOn && (
          <div>
            <p>
              Electricity costs per year after GSHP investment: {costsWithGshp}{" "}
              €
            </p>
            <p>Return of investment time: {roiTime} years</p>
          </div>
        )}
      </div>
    );
  }
}

export default Results;
