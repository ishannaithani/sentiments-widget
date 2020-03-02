import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import styles from './emoji.module.scss';
import defaultSVGUrl from './smile.svg';

export const Emoji = ({ emojiSVGUrl }) => {
  const [state, setState] = useState({ mounted: false });

  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }    
  }, [])

  const { mounted } = state;
  const stopTouchPropagation = (e) => {
    e.stopPropagation();
    return false;
  }

  return <CSSTransition in={mounted} classNames="emoji" timeout={200} unmountOnExit>
    <div className={styles.emojiWrapper}>
      <div data-testid="emoji-svg-url" style={{ backgroundImage: `url(${emojiSVGUrl})` }} className={styles.emoji} onTouchStart={stopTouchPropagation}>
        <span role="img" aria-label="Happy!" className={styles.emojiContent}></span>
      </div>    
    </div>
  </CSSTransition>
}

Emoji.propTypes = {
  emojiSVGUrl: PropTypes.string.isRequired
}

Emoji.defaultProps = {
  emojiSVGUrl: defaultSVGUrl
}

