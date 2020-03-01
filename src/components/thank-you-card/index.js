import React from 'react';

import styles from './thank-you-card.module.scss';

export const ThankYouCard = () => {
  return <div className={styles.card}>
    <h4 className={styles.heading}>Thank you!</h4>
    <p>Your feedback is valuable to us. </p>
  </div>
}