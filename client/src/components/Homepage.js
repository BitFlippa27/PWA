import React, { Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";



const Homepage = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if(isAuthenticated) {
    console.log("Redirect");
    return <Redirect to="/data" />;
  }

  return (
  <Fragment>
    <section className="homepage">
      <div className="dark-overlay">
        <div className="homepage-inner">
          <h1 className="x-large">GoodSync</h1>
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
