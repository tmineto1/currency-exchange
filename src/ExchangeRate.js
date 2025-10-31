import React, { useEffect, useState } from "react";

const ExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD"); // <-- base currency state
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
  }, [baseCurrency]); // <-- re-fetch whenever baseCurrency changes

  if (loading) return <div className="p-3">Loading exchange rates...</div>;
  if (error) return <div className="p-3 text-danger">Error: {error}</div>;

  const currencyOptions = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "JPY"];

  return (
    <div
      className="exchange-rate-panel bg-light border-start p-3"
      style={{
        width: "250px",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h5>Exchange Rates</h5>

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

      <table className="table table-hover table-striped table-sm">
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
