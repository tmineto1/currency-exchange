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
    this.swapCurrencies = this.swapCurrencies.bind(this);
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

  swapCurrencies() {
    this.setState(
      (prevState) => ({
        fromCurrency: prevState.toCurrency,
        toCurrency: prevState.fromCurrency,
      }),
      this.convert
    );
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
      <div className="container card mr-3 col-12">
        <div className="text-center p-3 mb-2">
          <h2 className="card-title mb-2">Currency Converter</h2>
          <h4>
            {amount} {fromCurrency} = {result !== null ? result : "..."} {toCurrency}
          </h4>
        </div>

        <div className="row justify-content-center g-2 pb-4">
          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <input
              type="number"
              value={amount}
              onChange={this.handleAmountChange}
              className="form-control form-control-lg"
            />
          </div>

          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <select
              value={fromCurrency}
              onChange={this.handleFromChange}
              className="form-select form-select-lg"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-auto mb-2 mb-md-0">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={this.swapCurrencies}
              title="Swap currencies"
            >
              ⇄
            </button>
          </div>

          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <select
              value={toCurrency}
              onChange={this.handleToChange}
              className="form-select form-select-lg"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

    );
  }
}

export default CurrencyConverter;
