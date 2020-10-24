import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { checkOut } from "../actions/attendance";

const Navbar = ({ auth: { isAuthenticated }, logout, checkOut }) => {

  const authLinks = (
    <ul>
      <li>
        <Link to="/data">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Data</span>
        </Link>
      </li>
      <li>
        <a onClick={()=>{ logout(); checkOut();}}href="/login">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Ausloggen</span>  {/* responsive, just show icon on mobile devices */}
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Registrieren</Link>
      </li>
      <li>
        <Link to="/login">Anmelden</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> Company
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  checkOut: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, checkOut })(Navbar);
