import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../../../app.context';
import { ANIMATION_STEP_CLASSES } from '../../../enums';
import { ACTION_TYPES } from '../../../actions/app.actions';


import styles from './close-button.module.scss';

export const CloseButton = ({ transitionTo, positionTop: top, positionRight: right, color }) => {
  const { dispatch } = useContext(AppContext);
  return <button style={{ color, top, right  }} className={styles.button} onClick={ () => dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: transitionTo }) }>
    &times;
  </button>
}

CloseButton.propTypes = {
  transitionTo: PropTypes.string.isRequired,
  positionTop: PropTypes.number,
  positionRight: PropTypes.number,
  color: PropTypes.string
}

CloseButton.defaultProps = {
  transitionTo: ANIMATION_STEP_CLASSES.DEFAULT,
  positionTop: 0,
  positionRight: 0,
  color: '#999'
}