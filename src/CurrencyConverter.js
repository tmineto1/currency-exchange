import React from "react";

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fromCurrency: "USD",
      toCurrency: "EUR",
      result: null,
      currencies: [],
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.convert = this.convert.bind(this);
  }

  componentDidMount() {

    fetch("https://api.frankfurter.app/currencies")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({currencies: Object.keys(data)});
      })
      .catch((err) => console.error(err));

      this.convert();
  }
  
  convert() {
    const { amount, fromCurrency: from, toCurrency: to } = this.state;

    if (from === to) {
      this.setState({ result: amount });
      return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = data.rates[to].toFixed(2);
        this.setState({ result: convertedAmount });
      })
      .catch((err) => console.error(err));
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value }, this.convert);
  }

  handleFromChange(e) {
    this.setState({ fromCurrency: e.target.value }, this.convert);
  }

  handleToChange(e) {
    this.setState({ toCurrency: e.target.value }, this.convert);
  }
  

  render() {
    const { amount, fromCurrency, toCurrency, result, currencies } = this.state;

    return (
      <div className="container">
        <div className="text-center p-3 mb-2">
          <h2 className="mb-2">Currency Converter</h2>
          <h4>
            {amount} {fromCurrency} = {result !== null ? result : "..."} {toCurrency}
          </h4>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-2">
            <input
              type="number"
              value={amount}
              onChange={this.handleAmountChange}
              className="form-control"
            />
          </div>

          <div className="col-md-4 mb-2">
            <select
              value={fromCurrency}
              onChange={this.handleFromChange}
              className="form-control"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <select
              value={toCurrency}
              onChange={this.handleToChange}
              className="form-control"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
