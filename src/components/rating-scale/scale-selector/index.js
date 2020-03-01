import React from 'react';
import PropTypes from 'prop-types';

import styles from './scale-selector.module.scss';

export const ScaleSelector = ({ maximumRating, onRatingReceived }) => {
  
  return <ul className={styles.scaleSelector}>
    {
      Array.from(Array(maximumRating), (v, k) => {
      const rating = k + 1;
      return <li key={rating}>
        <button className={styles.buttonRating} onTouchStart={onRatingReceived.bind(this, rating)} onClick={onRatingReceived.bind(this, rating)}>
          { rating }
        </button>
      </li>
      })
    }
  </ul>
}

ScaleSelector.propTypes = {
  maximumRating: PropTypes.number,
  onRatingReceived: PropTypes.func.isRequired
}

ScaleSelector.defaultProps = {
  maximumRating: 6,
  onRatingReceived: () => {}
}