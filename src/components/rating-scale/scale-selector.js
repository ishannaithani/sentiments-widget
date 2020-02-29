import React from 'react';
import PropTypes from 'prop-types';

export const ScaleSelector = ({ maximumRating, onRatingReceived }) => {
  return <ul className="scale-selector">
    {
      Array.from(Array(maximumRating), (v, k) => {
      const rating = k + 1;
      return <li key={rating}>
        <button className='rating' onClick={onRatingReceived.bind(this, rating)}>
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