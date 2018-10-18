import React, { Component } from "react";

class Form extends Component {
  render() {
    const { electricityPrice, onSetPrice } = this.props;
    console.log("Form rendered", electricityPrice);

    return (
      <div>
        <h3>Formi</h3>
        <input
          type="number"
          name="electricityName"
          value={electricityPrice}
          onChange={onSetPrice}
        />
      </div>
    );
  }
}

export default Form;
