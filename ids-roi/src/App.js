import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Results from "./components/Results";

class App extends Component {
  componentDidMount() {
    this.setState({
      data: this.data(
        this.state.electricityPrice,
        this.state.yearConsumption,
        this.state.gshpPrice,
        this.state.gshpOn,
        this.state.gshpSavings,
        this.state.gshpYear
      )
    });
  }

  constructor() {
    super();
    this.state = {
      startYear: 2015,
      endYear: 2040,
      electricityPrice: 0.12,
      yearConsumption: 24000,
      costs: [],
      data: [],
      gshpOn: false,
      gshpYear: 2016,
      gshpPrice: 20000,
      gshpSavings: 7000,
      solarPanelsOn: false
    };
  }

  data = (price, yearConsumption, gshpPrice, gshpOn, gshpSavings, gshpYear) => {
    let labels = [];
    let costs = [];
    let costsGshp = [];
    let electricityCostsBeforeGshp = 0;

    let endYear = this.state.endYear;
    if (gshpOn) {
      endYear =
        this.roiTime(gshpPrice, price, gshpSavings) +
        this.state.startYear +
        (gshpYear - this.state.startYear) +
        4;
    }
    console.log(endYear);
    if (endYear - this.state.startYear > 500 || isNaN(endYear)) return [];

    for (let year = this.state.startYear; year <= endYear; year++) {
      labels.push(year);

      let cost = (year - this.state.startYear + 1) * yearConsumption * price;
      costs.push(cost);

      if (gshpOn) {
        if (year < gshpYear) {
          costsGshp.push(null);
          electricityCostsBeforeGshp = cost;
        } else {
          let cost =
            (year - gshpYear + 1) * (yearConsumption - gshpSavings) * price +
            electricityCostsBeforeGshp +
            gshpPrice;
          costsGshp.push(cost);
        }
      }
    }

    let data = {
      labels: labels,
      datasets: [
        {
          label: "Cost without investments",
          backgroundColor: "rgba(192, 192, 192, 0.4)",
          data: costs
        }
      ]
    };

    if (costsGshp.length > 1) {
      data.datasets.push({
        label: "Costs with Ground-Source Heat Pump",
        backgroundColor: "rgba(75,192,192, 0.4)",
        data: costsGshp
      });
    }

    return data;
  };

  results = () => {};

  onSetPrice = e => {
    const newPrice = parseFloat(e.target.value);
    console.log("newPrice", newPrice);
    this.setState({
      electricityPrice: newPrice,
      data: this.data(
        newPrice,
        this.state.yearConsumption,
        this.state.gshpPrice,
        this.state.gshpOn,
        this.state.gshpSavings,
        this.state.gshpYear
      )
    });
  };

  onSetYearConsumption = e => {
    const newYearConsumption = parseFloat(e.target.value);
    console.log("newYearConsumption", newYearConsumption);
    this.setState({
      yearConsumption: newYearConsumption,
      data: this.data(
        this.state.electricityPrice,
        newYearConsumption,
        this.state.gshpPrice,
        this.state.gshpOn,
        this.state.gshpSavings,
        this.state.gshpYear
      )
    });
  };

  onSetGshpPrice = e => {
    const newGshpPrice = parseFloat(e.target.value);
    console.log("newGshpPrice", newGshpPrice);
    this.setState({
      gshpPrice: newGshpPrice,
      data: this.data(
        this.state.electricityPrice,
        this.state.yearConsumption,
        newGshpPrice,
        this.state.gshpOn,
        this.state.gshpSavings,
        this.state.gshpYear
      )
    });
  };

  onToggleGshp = () => {
    let newState = !this.state.gshpOn;
    this.setState({
      gshpOn: newState,
      data: this.data(
        this.state.electricityPrice,
        this.state.yearConsumption,
        this.state.gshpPrice,
        newState,
        this.state.gshpSavings,
        this.state.gshpYear
      )
    });
  };

  onSetSavings = e => {
    const newSavings = parseFloat(e.target.value);
    console.log("newGshpSavings", newSavings);
    this.setState({
      gshpSavings: newSavings,
      data: this.data(
        this.state.electricityPrice,
        this.state.yearConsumption,
        this.state.gshpPrice,
        this.state.gshpOn,
        newSavings,
        this.state.gshpYear
      )
    });
  };

  onSelectGshpYear = e => {
    const newYear = parseFloat(e.target.value);
    console.log("newGshpYear");
    this.setState({
      gshpYear: newYear,
      data: this.data(
        this.state.electricityPrice,
        this.state.yearConsumption,
        this.state.gshpPrice,
        this.state.gshpOn,
        this.state.gshpSavings,
        newYear
      )
    });
  };

  roiTime = (gshpPrice, electricityPrice, savings) => {
    return Math.round(gshpPrice / (savings * electricityPrice));
  };

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>Return of Investment Counter</h1>
        </div>
        <div className="roi-view">
          <div className="form">
            <Form
              electricityPrice={this.state.electricityPrice}
              yearConsumption={this.state.yearConsumption}
              onSetYearConsumption={this.onSetYearConsumption}
              onSetPrice={this.onSetPrice}
              gshpOn={this.state.gshpOn}
              onToggleGshp={this.onToggleGshp}
              solarPanelsOn={this.state.solarPanelsOn}
              onToggleSolarPanels={this.onToggleSolarPanels}
              gshpPrice={this.state.gshpPrice}
              onSetGshpPrice={this.onSetGshpPrice}
              gshpSavings={this.state.gshpSavings}
              onSetSavings={this.onSetSavings}
              gshpYear={this.state.gshpYear}
              onSelectGshpYear={this.onSelectGshpYear}
              startYear={this.state.startYear}
            />
          </div>
          <div className="right">
            <div className="graphs">
              <Chart data={this.state.data} />
            </div>
            <Results
              className="results"
              electricityPrice={this.state.electricityPrice}
              yearConsumption={this.state.yearConsumption}
              savings={this.state.gshpSavings}
              roiTime={this.roiTime(
                this.state.gshpPrice,
                this.state.electricityPrice,
                this.state.gshpSavings
              )}
              gshpOn={this.state.gshpOn}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
