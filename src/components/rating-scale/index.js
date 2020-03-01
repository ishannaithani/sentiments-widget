import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { ScaleSelector } from './scale-selector';
import { Emoji  } from '../emoji/index';

import styles from './rating-scale.module.scss';

export const RatingScale = (props) => {
  const [state, setState] = useState({ mounted: false, rating: null });
  const { heading, showMessageAfterRating, messageTextAfterRating, ...rest } = props;

  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }
  }, [])

  const { mounted, rating } = state;
  const onRatingReceived = (ratedValue) => {
    setState({ rating: ratedValue });
  }

  if (showMessageAfterRating && rating !== null && typeof rating === 'number') {

    setTimeout(() => {
      // Dispatch nex step
    }, 4000)

    return <div className={styles.onRatingReceived}>
      <div className={styles.emojiWrapper}>
        <Emoji />
      </div>
      <h4>{messageTextAfterRating}</h4>
    </div>
  }

  return <div>
      <CSSTransition in={mounted} classNames={{ appear: styles.heading_appear, enter: styles.heading_enter, enterDone: styles.heading_enter_done }} timeout={450} unmountOnExit>
        <h4 className={styles.headingText}>{heading}</h4>
      </CSSTransition>
      <CSSTransition in={mounted} classNames={{ appear: styles.selector_appear, enter: styles.selector_enter, enterDone: styles.selector_enter_done}} timeout={{ appear: 200, enter: 800 }} unmountOnExit>
        <ScaleSelector {...rest} onRatingReceived={onRatingReceived} />
      </CSSTransition>
    </div>
}

RatingScale.propTypes = {
  heading: PropTypes.string,
  showMessageAfterRating: PropTypes.bool
}

RatingScale.defaultProps = {
  heading: 'Rate your experience',
  showMessageAfterRating: true,
  messageTextAfterRating: 'Thank you! Tell us more.'
}

