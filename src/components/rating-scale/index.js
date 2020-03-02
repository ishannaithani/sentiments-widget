import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { AppContext } from '../../app.context';
import { ACTION_TYPES } from '../../actions/app.actions';
import { Emoji  } from '../emoji/index';
import { ANIMATION_STEP_CLASSES, FEEDBACK_TIMEOUT } from '../../enums';

import styles from './rating-scale.module.scss';

import { ScaleSelector } from './scale-selector';
import { CloseButton } from '../layout/close-button';

const initialState = {
  mounted: false, 
  rating: null
};

export const RatingScale = (props) => {
  const [state, setState] = useState(initialState);
  const { heading, showMessageAfterRating, messageTextAfterRating, ...rest } = props;
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }
  }, []);

  const { mounted, rating } = state;
  const onRatingReceived = (ratedValue) => {
    setState({ rating: ratedValue });
  }

  if (showMessageAfterRating && rating !== null && typeof rating === 'number') {
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.STEP_3 })
    }, FEEDBACK_TIMEOUT);

    return <div className={styles.onRatingReceived}>
      <div className={styles.emojiWrapper}>
        <Emoji />
      </div>
      <h4 data-testid="message-text-after-rating">{messageTextAfterRating}</h4>
    </div>
  }

  return <div>
      <CloseButton transitionTo={ANIMATION_STEP_CLASSES.DEFAULT} />
      <CSSTransition in={mounted} classNames={{ appear: styles.heading_appear, enter: styles.heading_enter, enterDone: styles.heading_enter_done }} timeout={450} unmountOnExit>
        <h4 data-testid="heading" className={styles.headingText}>{heading}</h4>
      </CSSTransition>
      <CSSTransition in={mounted} classNames={{ appear: styles.selector_appear, enter: styles.selector_enter, enterDone: styles.selector_enter_done}} timeout={{ appear: 200, enter: 800 }} unmountOnExit>
        <ScaleSelector {...rest} onRatingReceived={onRatingReceived} />
      </CSSTransition>
    </div>
}

RatingScale.propTypes = {
  heading: PropTypes.string,
  showMessageAfterRating: PropTypes.bool,
  maximumRating: PropTypes.number
}

RatingScale.defaultProps = {
  heading: 'Rate your experience',
  showMessageAfterRating: true,
  messageTextAfterRating: 'Thank you! Tell us more.',
  maximumRating: 6
}

