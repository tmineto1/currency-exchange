import React from "react";
import Navbar from "./Navbar";
import ExchangeRate from "./ExchangeRate";
import CurrencyConverter from "./CurrencyConverter";
import Footer from "./Footer";
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
      <Footer />
    </div>
  );
}

export default App;
