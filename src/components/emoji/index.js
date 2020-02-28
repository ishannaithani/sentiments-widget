import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

export const Emoji = () => {
  const [state, setState] = useState({ mounted: false });

  useEffect(() => {
    setState({ mounted: true });
  }, [])

  const { mounted } = state;

  return <CSSTransition in={mounted} classNames="emoji" timeout={200} unmountOnExit>
    <div className="emoji-wrapper">
      <div className="emoji">
        <span role="img" aria-label="Happy!" className="emoji-content">&#128578;</span>
      </div>    
    </div>
  </CSSTransition>
}

