import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../../app.context';
import { ACTION_TYPES } from '../../actions/app.actions';
import { ANIMATION_STEP_CLASSES } from '../../enums';
import { THANKYOU_TIMEOUT } from '../../enums';

import styles from './thank-you-card.module.scss';

export const ThankYouCard = ({ heading, subtitle }) => {
  const { dispatch } = useContext(AppContext);

  setTimeout(() => {
    dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.DEFAULT });
  }, THANKYOU_TIMEOUT);

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