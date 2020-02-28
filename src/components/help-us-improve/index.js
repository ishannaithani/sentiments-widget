import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { ANIMATION_STEP_CLASSES } from '../../enums';

export const HelpUsImprove = ({ triggerContainerAnimation }) => {
  const [state, setState] = useState({ mounted: false });

  useEffect(() => {
    setState({ mounted: true });
  }, [])

  const { mounted } = state;

  return <CSSTransition in={mounted} classNames="help-us-improve" timeout={{ appear: 100, enter: 200, exit: 200 }}>
      <button className="help-us-improve-button" onClick={triggerContainerAnimation.bind(this, ANIMATION_STEP_CLASSES.STEP_2)}>Help us improve</button>
  </CSSTransition>
}

HelpUsImprove.propTypes = {
  triggerContainerAnimation: PropTypes.func
}
