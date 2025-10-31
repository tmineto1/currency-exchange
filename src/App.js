import React from "react";
import Navbar from "./Navbar";
import CurrencyConverter from "./CurrencyConverter";
import ExchangeRate from "./ExchangeRate";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      {/* Left/main content area */}
      <div style={{ flex: 1, marginRight: "250px" }}>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="container mt-5">
          <CurrencyConverter />
        </div>

        {/* Footer */}
        <footer className="bg-light py-3 mt-5">
          <div className="container text-center">
          </div>
        </footer>
      </div>

      {/* Right-side */}
      <ExchangeRate />
    </div>
  );
}

export default App;

