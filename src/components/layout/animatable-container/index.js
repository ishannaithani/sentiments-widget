import React, { useContext } from 'react';
import { AppContext } from '../../../app.context';
import { ACTION_TYPES } from '../../../actions/app.actions';
import { ANIMATION_STEP_CLASSES } from '../../../enums';

import styles from './animatable-container.module.scss';

export const AnimatableContainer = ({ children, currentStep }) => {
  const { dispatch } = useContext(AppContext);
  const triggerContainerAnimation = (nextClassName) => {
    dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: nextClassName })
  };

  const onMouseEnter = currentStep === ANIMATION_STEP_CLASSES.DEFAULT ? triggerContainerAnimation.bind(this, ANIMATION_STEP_CLASSES.STEP_1) : null;
  const onMouseLeave = currentStep === ANIMATION_STEP_CLASSES.STEP_1 ? triggerContainerAnimation.bind(this, ANIMATION_STEP_CLASSES.DEFAULT) : null;

  return <div 
    className={`${styles.root} ${styles[`${currentStep}`]}`}
    onMouseEnter={onMouseEnter} 
    onMouseLeave={onMouseLeave}    
    >
    {
      React.cloneElement(children, { triggerContainerAnimation })
    }
  </div>
}