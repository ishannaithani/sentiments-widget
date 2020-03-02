import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
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

export const FeedbackForm = ({ questionExperience, placeholderExperience, questionImprovement, placeholderImprovement, questionEmail, placeholderEmail, sumbitButtonText, formHeadingText }) => {
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
        <h4 data-testid="form-heading">{formHeadingText}</h4>
      </div>
      <form className={styles.body}>
        <div className={styles.formGroup}>
          <label data-testid="question-experience-label" className={styles.label}>{questionExperience}</label>
          <textarea data-testid="question-experience-textarea" value={likedMost}  onChange={(e) => setState({ ...state, likedMost: e.target.value  })} placeholder={placeholderExperience}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label data-testid="improve-experience-label"  className={styles.label}>{ questionImprovement }</label>
          <textarea data-testid="improve-experience-textarea" value={likedLeast} onChange={(e) => setState({ ...state, likedLeast: e.target.value  })}  placeholder={placeholderImprovement}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label data-testid="email-input-label" className={styles.label}>{questionEmail}</label>
          <input data-testid="email-input" value={email} onChange={(e) => setState({ ...state, email: e.target.value  })}  type="email" placeholder={placeholderEmail} />        
        </div>

        <div className={styles.submitButtonStyles}>
          <button data-testid="submit-button" onClick={onFeedbackFormSubmitted} disabled={isSubmitButtonDisabled}>{sumbitButtonText}</button>
        </div>
      </form>
    </div>
  </CSSTransition>
}

FeedbackForm.propTypes = {
  formHeadingText: PropTypes.string,
  questionExperience: PropTypes.string,
  placeholderExperience: PropTypes.string,
  questionImprovement: PropTypes.string,
  placeholderImprovement: PropTypes.string,
  questionEmail: PropTypes.string,
  placeholderEmail: PropTypes.string,
  sumbitButtonText: PropTypes.string
}

FeedbackForm.defaultProps = {
  formHeadingText: 'Tell us more',
  questionExperience: 'What did you like the most?',
  placeholderExperience: 'Tell us your experience (optional)',
  questionImprovement: 'What did you like the least?',
  placeholderImprovement: 'Let us know how we can improve (optional)',
  questionEmail: 'Your email',
  placeholderEmail: 'Your email address (optional)',
  sumbitButtonText: 'Submit'
  
}
