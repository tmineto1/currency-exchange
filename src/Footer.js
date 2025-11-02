import React from "react";

const Footer = () => {
  return(
    <footer className="bg-light py-3 mt-5">
     <div className="container text-center d-flex justify-content-center align-items-center flex-wrap gap-3">
        <small className="text-muted">
          Check out my <a href="https://thomasminetos.carrd.co/">portfolio</a>
        </small>
      
        <small className="text-muted">
          <a href="http:www.altcademy.com">Altcademy.com</a>
        </small>
      
        <small className="text-muted">
          Data provided by <a href="https://frankfurter.dev/">Frankfurter.dev</a>
        </small>
      </div>
    </footer>
  )
}

export default Footer;