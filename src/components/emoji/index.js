import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './emoji.module.scss';

export const Emoji = () => {
  const [state, setState] = useState({ mounted: false });

  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }    
  }, [])

  const { mounted } = state;

  return <CSSTransition in={mounted} classNames="emoji" timeout={200} unmountOnExit>
    <div className={styles.emojiWrapper}>
      <div className={styles.emoji}>
        <span role="img" aria-label="Happy!" className={styles.emojiContent}>&#128578;</span>
      </div>    
    </div>
  </CSSTransition>
}

