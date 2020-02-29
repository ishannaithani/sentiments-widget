import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { ScaleSelector } from './scale-selector';
import { Emoji  } from '../emoji/index';

export const RatingScale = (props) => {
  const [state, setState] = useState({ mounted: false, rating: null });
  const { heading, showMessageAfterRating, messageTextAfterRating, ...rest } = props;

  useEffect(() => {
    setState({ mounted: true });
  }, [])

  const { mounted, rating } = state;
  const onRatingReceived = (ratedValue) => {
    setState({ rating: ratedValue });
  }

  if (showMessageAfterRating && rating !== null && typeof rating === 'number') {
    return <div className="rating-scale-after-rating">
      <div className="emoji-wrapper-thankyou">
        <Emoji />
      </div>
       <h4>{messageTextAfterRating}</h4>
    </div>
  }

  return <div>
      <CSSTransition in={mounted} classNames="rating-scale heading" timeout={450} unmountOnExit>
        <h4 className="margin-bottom-0 text-center margin-top-0">{heading}</h4>
      </CSSTransition>
      <CSSTransition in={mounted} classNames="rating-scale rating-selector" timeout={{ appear: 200, enter: 800 }} unmountOnExit>
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

