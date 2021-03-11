import React, { Fragment } from 'react'
import { Link } from "react-router-dom";


const Offline = () => {
  return (
    <Fragment>
      <h1>
        Sie sind Offline ! Melden Sie sich an, wenn Sie wieder online sind<Link to="/login">zum Login </Link>
      </h1>
    </Fragment>
    );
};

export default Offline;
