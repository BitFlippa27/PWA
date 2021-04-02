import React, { Fragment } from 'react';
import loaderGif from './loader-gif.gif';

const Loader = () => {
  return (
    <Fragment>
      <img
        className="loader"
        src={loaderGif}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Lädt...'
      />
    </Fragment>
  );
}

export default Loader;
