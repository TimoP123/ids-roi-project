import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  render() {
    const {
      electricityPrice,
      yearConsumption,
      onSetPrice,
      onSetYearConsumption,
      gshpOn,
      onToggleGshp,
      gshpPrice,
      onSetGshpPrice,
      gshpSavings,
      onSetSavings,
      gshpYear,
      onSelectGshpYear,
      startYear
    } = this.props;
    console.log("Form rendered", electricityPrice);

    const yearOptions = () => {
      console.log("yearOptions");
      let options = [];
      for (let i = 0; i < 15; i++) {
        options.push(
          <option key={i} value={startYear + i}>
            {startYear + i}
          </option>
        );
      }
      return options;
    };

    return (
      <div>
        <h3>Prices</h3>
        <table>
          <tbody>
            <tr>
              <td className="firstColumn">Electricity price</td>
              <td className="secondColumn">
                <input
                  type="number"
                  name="electricityName"
                  value={electricityPrice}
                  onChange={onSetPrice}
                />
              </td>
              <td className="thirdColumn">€/kWh</td>
            </tr>
            <tr>
              <td className="firstColumn">Consumption / year</td>
              <td className="secondColumn">
                <input
                  type="number"
                  name="yearConsumption"
                  value={yearConsumption}
                  onChange={onSetYearConsumption}
                />
              </td>
              <td className="thirdColumn">kWh</td>
            </tr>
            <tr>
              <td className="firstColumn">Ground-Source Heat Pump</td>
              <td className="secondColumn">
                <input
                  type="checkbox"
                  name="gshpOn"
                  checked={gshpOn}
                  onChange={onToggleGshp}
                />
              </td>
            </tr>
            {gshpOn && (
              <tr>
                <td className="firstColumn">GSHP price</td>
                <td className="secondColumn">
                  <input
                    type="number"
                    name="gshpPrice"
                    value={gshpPrice}
                    onChange={onSetGshpPrice}
                  />
                </td>
                <td className="thirdColumn">€</td>
              </tr>
            )}
            {gshpOn && (
              <tr>
                <td className="firstColumn">
                  Reduction in electricity consumption
                </td>
                <td className="secondColumn">
                  <input
                    type="number"
                    name="gshpPrice"
                    value={gshpSavings}
                    onChange={onSetSavings}
                  />
                </td>
                <td className="thirdColumn">kWh</td>
              </tr>
            )}
            {gshpOn && (
              <tr>
                <td className="firstColumn">Year of investment</td>
                <td className="secondColumn">
                  <select
                    name="gshpYear"
                    value={gshpYear}
                    onChange={onSelectGshpYear}
                  >
                    {yearOptions()}
                  </select>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Form;
