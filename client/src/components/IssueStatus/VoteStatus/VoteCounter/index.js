import React from 'react';
import PropTypes from 'prop-types';
import css from './VoteCounter.css';

const VoteCounter = ({ count, total, label }) => (
  <div className={css.counter}>
    <div className={css.label}>
      { label } <span className={css.count}>({ count } / { total })</span>
    </div>
    <div className={css.bar}>
      <div className={css.progress} style={{ width: total ? `${(count / total) * 100}%` : '0%' }} />
    </div>
  </div>
);

VoteCounter.defaultProps = {
  total: 0,
  count: 0,
};

VoteCounter.propTypes = {
  total: PropTypes.number,
  count: PropTypes.number,
  label: PropTypes.string.isRequired,
};

export default VoteCounter;
