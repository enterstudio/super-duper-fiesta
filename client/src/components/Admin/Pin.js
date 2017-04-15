import React, { PropTypes } from 'react';

const Pin = ({ code }) => (
  <div>
    <b>Gjeldende PIN kode</b>: {code}
  </div>
);

Pin.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Pin;
