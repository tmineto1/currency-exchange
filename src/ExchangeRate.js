import React from "react";

class ExchangeRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates:{},
      baseCurrency: "USD",
      loading: true,
      error: null,
    };
  }

  
  componentDidMount() {
    this.fetchRates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.baseCurrency !== this.state.baseCurrency) {
      this.fetchRates();
    }
  }

  fetchRates() {
  this.setState({ loading: true });

    fetch(`https://api.frankfurter.app/latest?from=${this.state.baseCurrency}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!data || !data.rates) throw new Error("No rates found in response");
        this.setState({ rates: data.rates, loading: false, error: null });
      })
      .catch((err) => {
        console.error("Error fetching rates:", err);
        this.setState({ error: err.message, loading: false });
      });
  }

  handleBaseChange = (event) => {
    this.setState({ baseCurrency: event.target.value });
  };



  render () {
    const {rates, baseCurrency, loading, error } = this.state;
    const currencyOptions = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "JPY", "BGN", "BRL", "CNY", "CZK", "DKK", "HKD", "HUF", "IDR", "ILS", "INR", "ISK", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "ZAR"]

 

  return (
    <div
      className="container card sidebar"
    >
      <h3 className="text-center py-4 font-weight-bold">Exchange Rates</h3>

      <select
        className="form-select mb-3"
        value={baseCurrency}
        onChange={this.handleBaseChange}
      >
        {currencyOptions.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <table className="table table-striped table-sm table-hover">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate ({baseCurrency})</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

}
export default ExchangeRate;

