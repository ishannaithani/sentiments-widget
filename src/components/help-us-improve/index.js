import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { AppContext } from '../../app.context';
import { ACTION_TYPES } from '../../actions/app.actions';
import { ANIMATION_STEP_CLASSES } from '../../enums';
import styles from './help-us-improve.module.scss';

export const HelpUsImprove = () => {
  const [state, setState] = useState({ mounted: false });
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }    
  }, [])

  const { mounted } = state;

  const onButtonClicked = () => {
    dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.STEP_2 });
  }

  return <CSSTransition in={mounted} classNames={{ enter: styles.buttonEnter, appear: styles.buttonAppear, enterDone: styles.buttonEnterDone }} timeout={{ appear: 100, enter: 200, exit: 200 }}>
      <button className={styles.button} onClick={onButtonClicked} onTouchStart={onButtonClicked}>Help us improve</button>
  </CSSTransition>
}

HelpUsImprove.propTypes = {
  triggerContainerAnimation: PropTypes.func
}
