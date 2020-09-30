import React, { Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';




const Homepage = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    console.log("Redirect");
    return <Redirect to="/dashboard" />;
  }

  return ( 
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
}

Homepage.propTypes = {
  isAuthenticated: PropTypes.bool
};

 const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
 }); 

export default connect(mapStateToProps)(Homepage);
