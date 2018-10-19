import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import BarChart from "./components/BarChart";
import Results from "./components/Results";

class App extends Component {

  componentDidMount() {
    this.setState({ costs: this.costs(this.state.electricityPrice) });
  }

  constructor() {
    super();
    this.state = {
      startYear: 2015,
      endYear: 2019,
      electricityPrice: 0.12,
      costs: []
    };
  }

  costs = price => {
    let arr = [];
    for (let year = this.state.startYear; year <= this.state.endYear; year++) {
      arr.push(price);
      price += price;
    }
    console.log(arr);
    return arr;
  };

  onSetPrice = e => {
    const newPrice = parseFloat(e.target.value);
    console.log("newPrice", newPrice);
    this.setState({ electricityPrice: newPrice, costs: this.costs(newPrice) });
  };

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>The title</h1>
        </div>
        <div className="roi-view">
          <div className="form">
            <Form
              electricityPrice={this.state.electricityPrice}
              onSetPrice={this.onSetPrice}
            />
          </div>
          <div className="graphs">
            <BarChart
              electricityPrice={this.state.electricityPrice}
              width={600}
              height={300}
              costs={this.state.costs}
            />
            <Results />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
