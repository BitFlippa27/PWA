import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { checkOut } from "../actions/attendance";
import { useSelector } from "react-redux";
import store from '../store';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const authLinks = (
    <ul>
      <li>
        <Link to="/data">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Data</span>
        </Link>
      </li>
      <li>
        <a onClick={()=>{ store.dispatch(logout()) }} href="/login">
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
    <nav className="navbar">
      <h2>
        <Link to="/">
          <i className="fas fa-code" /> GoodSync
        </Link>
      </h2>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>


  );
};

export default Navbar;
