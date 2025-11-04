import React from "react";
import Chart from 'chart.js/auto';
import { checkStatus, json } from './utils/fetchUtils';

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
    this.chartRef = React.createRef();

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
    const { amount, fromCurrency, toCurrency } = this.state;

    if (fromCurrency === toCurrency) {
      this.setState({ result: amount });
      return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = data.rates[toCurrency].toFixed(2);
        this.setState({ result: convertedAmount });
        this.getHistoricalRates(fromCurrency, toCurrency);
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

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }
  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })
  }


  handleAmountChange(event) {
    this.setState({ amount: event.target.value }, this.convert);
  }

  handleFromChange(event) {
    this.setState({ fromCurrency: event.target.value }, this.convert);
  }

  handleToChange(event) {
    this.setState({ toCurrency: event.target.value }, this.convert);
  }
  

  render() {
    const { amount, fromCurrency, toCurrency, result, currencies } = this.state;

    return (
      <div className="container card mr-3 col-12 d-flex"
      style={{ minHeight: '600px' }}>
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
        <div className="canvas">
          <canvas ref={this.chartRef} />
        </div>
      </div>

    );
  }
}

export default CurrencyConverter;
