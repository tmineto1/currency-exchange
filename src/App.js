import React from "react";
import Navbar from "./Navbar";
import ExchangeRate from "./ExchangeRate";
import CurrencyConverter from "./CurrencyConverter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Add custom CSS (we’ll define it below)

function App() {
  return (
    <div>
      {/* Full-width fixed navbar */}
      <Navbar />

      {/* Main content container */}
      <div className="container-fluid mt-4 px-4">
        <div className="row">
          {/* Left side: converter */}
          <div className="col-12 col-lg-8 mb-4">
            <CurrencyConverter />
          </div>

          {/* Right side: exchange rate */}
          <div className="col-12 col-lg-4">
            <ExchangeRate />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-3 mt-5">
        <div className="container text-center">
          <small className="text-muted">
            Data provided by{" "}
            <a href="https://www.frankfurter.app/">Frankfurter</a>
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
