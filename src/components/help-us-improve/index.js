import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { ANIMATION_STEP_CLASSES } from '../../enums';

import styles from './help-us-improve.module.scss';

export const HelpUsImprove = ({ triggerContainerAnimation }) => {
  const [state, setState] = useState({ mounted: false });

  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }    
  }, [])

  const { mounted } = state;

  return <CSSTransition in={mounted} classNames={{ enter: styles.buttonEnter, appear: styles.buttonAppear, enterDone: styles.buttonEnterDone }} timeout={{ appear: 100, enter: 200, exit: 200 }}>
      <button className={styles.button} onClick={triggerContainerAnimation.bind(this, ANIMATION_STEP_CLASSES.STEP_2)}>Help us improve</button>
  </CSSTransition>
}

HelpUsImprove.propTypes = {
  triggerContainerAnimation: PropTypes.func
}
