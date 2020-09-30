import React, { Fragment } from 'react';
import loader from './loader.gif';

export default () => (
  <Fragment>
    <img
      src={loader}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Lädt...'
    />
  </Fragment>
);