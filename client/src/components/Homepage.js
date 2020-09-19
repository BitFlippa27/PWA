import React, { Fragment } from 'react';
import { Link } from "react-router-dom";




const Homepage = () => (
  <Fragment>
    <section className="homepage">
      <div className="dark-overlay">
        <div className="homepage-inner">
          <h1 className="x-large">Company</h1>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Registrieren </Link>
            <Link to="/login" className="btn btn-light">Anmelden</Link>
          </div>
        </div>
      </div>
    </section>
    </Fragment>

  );
  

  

  


export default Homepage;
