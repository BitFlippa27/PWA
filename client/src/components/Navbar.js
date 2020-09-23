import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { logout } from '../actions/auth';

const Navbar = () => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={null} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Ausloggen</span>
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
      <Fragment></Fragment>
    </nav>
  );
};

export default Navbar;