import React from 'react';
import PropTypes from 'prop-types';

import styles from './thank-you-card.module.scss';

export const ThankYouCard = ({ heading, subtitle }) => {
  return <div className={styles.card}>
    <h4 data-testid="heading" className={styles.heading}>{heading}</h4>
    <p data-testid="subtitle">{subtitle}</p>
  </div>
}

ThankYouCard.propTypes = {
  heading: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

ThankYouCard.defaultProps = {
  heading: 'Thank you!',
  subtitle: 'Your feedback is valuable to us.'
}