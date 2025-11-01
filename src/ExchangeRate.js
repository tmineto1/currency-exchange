import React, { useEffect, useState } from "react";

const ExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!data || !data.rates) throw new Error("No rates found in response");
        setRates(data.rates);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rates:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [baseCurrency]);

  if (loading) return <div className="p-3">Loading exchange rates...</div>;
  if (error) return <div className="p-3 text-danger">Error: {error}</div>;

  const currencyOptions = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "JPY"];

  return (
    <div
      className="card bg-light border-start exchange-sidebar"
    >
      <h3 className="text-center py-4 font-weight-bold">Exchange Rates</h3>

      <select
        className="form-select mb-3"
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      >
        {currencyOptions.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <table className="table table-striped table-sm">
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

export default ExchangeRate;

