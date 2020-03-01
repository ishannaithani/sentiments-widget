import React, { useEffect, useState, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CloseButton } from '../layout/close-button';
import styles from './feedback-form.module.scss';

import { AppContext  } from '../../app.context';
import { ANIMATION_STEP_CLASSES } from '../../enums';
import { ACTION_TYPES } from '../../actions/app.actions';

const initialState = {
  mounted: false,
  likedMost: '',
  likedLeast: '',
  email: ''  
};

export const FeedbackForm = () => {
  const [state, setState] = useState(initialState);
  const { dispatch } = useContext(AppContext);


  useEffect(() => {
    if (!state.mounted) {
      setState({ ...state, mounted: true });
    }    
  }, [])

  const { mounted, likedLeast, likedMost, email } = state;
  const isSubmitButtonDisabled = likedLeast === "" && likedMost === "" && email === "";

  const onFeedbackFormSubmitted = (ev) => {
    ev.preventDefault();
    dispatch({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.STEP_4 });
  }

  return <CSSTransition 
    in={mounted} 
    classNames={{ 
      enter: styles.formEnter, 
      appear: styles.FormAppear, 
      enterDone: styles.formEnterDone,
      exit: styles.formExit,
      exitActive: styles.formExitActive,
      exitDone: styles.formExitDone
    }} 
    timeout={{ appear: 100, enter: 200, exit: 200 }}
    >
    <div className={styles.form}>
      <div className={styles.header}>
        <CloseButton positionTop={-5} />
        <h4>Tell us more</h4>
      </div>
      <form className={styles.body}>
        <div className={styles.formGroup}>
          <label className={styles.label}>What did you like the most?</label>
          <textarea value={likedMost}  onChange={(e) => setState({ ...state, likedMost: e.target.value  })} placeholder="Tell us your experience (optional)"></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>What did you like the least?</label>
          <textarea value={likedLeast} onChange={(e) => setState({ ...state, likedLeast: e.target.value  })}  placeholder="Let us know how we can improve (optional)"></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Your email</label>
          <input value={email} onChange={(e) => setState({ ...state, email: e.target.value  })}  type="email" placeholder="Your email address (optional)" />        
        </div>

        <div className={styles.submitButtonStyles}>
          <button onClick={onFeedbackFormSubmitted} disabled={isSubmitButtonDisabled}>Submit</button>
        </div>
      </form>
    </div>
  </CSSTransition>
}

