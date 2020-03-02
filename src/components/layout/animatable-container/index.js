import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../app.context';
import { ACTION_TYPES } from '../../../actions/app.actions';
import { ANIMATION_STEP_CLASSES } from '../../../enums';

import styles from './animatable-container.module.scss';

export const AnimatableContainer = ({ children, currentStep }) => {
  const { dispatch } = useContext(AppContext);

  const boundMouseEvents = (payload, ev) => {
    dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload });
    return false;
  }

  const onMouseEnter = currentStep === ANIMATION_STEP_CLASSES.DEFAULT ? boundMouseEvents.bind(this, ANIMATION_STEP_CLASSES.STEP_1) : null;
  const onMouseLeave = currentStep === ANIMATION_STEP_CLASSES.STEP_1 ? boundMouseEvents.bind(this, ANIMATION_STEP_CLASSES.DEFAULT) : null;

  const onTouchStart = currentStep === ANIMATION_STEP_CLASSES.DEFAULT ? boundMouseEvents.bind(this, ANIMATION_STEP_CLASSES.STEP_1) : null;

  return <div 
    data-testid="animatable-container-root"
    className={`${styles.root} ${styles[`${currentStep}`]}`}
    onMouseEnter={onMouseEnter} 
    onMouseLeave={onMouseLeave}
    onTouchStart={onTouchStart}
    >
    {
      children
    }
  </div>
}

AnimatableContainer.propTypes = {
  children: PropTypes.element.isRequired,
  currentStep: PropTypes.string.isRequired
};

AnimatableContainer.defaultProps = {
  children: <>No Children passed in props</>,
  currentStep: ANIMATION_STEP_CLASSES.DEFAULT
};