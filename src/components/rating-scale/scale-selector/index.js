import React from 'react';
import PropTypes from 'prop-types';

import styles from './scale-selector.module.scss';

export const ScaleSelector = ({ maximumRating, onRatingReceived, ratingLowText, ratingHighText }) => {
  
  return <div className={styles.wrapper}>
    <ul className={styles.scaleSelector}>
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
    <div className={styles.ratingText}>
      <small className={styles.text}>
        { ratingLowText }
      </small>
      <small className={styles.text}>
        { ratingHighText }
      </small>
    </div>
  </div>
}

ScaleSelector.propTypes = {
  maximumRating: PropTypes.number,
  onRatingReceived: PropTypes.func.isRequired,
  ratingLowText: PropTypes.string,
  ratingHighText: PropTypes.string
}

ScaleSelector.defaultProps = {
  maximumRating: 6,
  onRatingReceived: () => {},
  ratingLowText: 'Not Satisfied',
  ratingHighText: 'Very Satisfied'
}