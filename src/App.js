import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState } from './reducers/app.reducer';
import { AppContext } from './app.context';
import './App.module.scss';
import { AppWrapper } from './components/layout/wrapper';
import { AnimatableContainer } from './components/layout/animatable-container';
import { ANIMATION_STEP_CLASSES } from './enums';
import { Emoji } from './components/emoji';
import { HelpUsImprove } from './components/help-us-improve';
import { RatingScale } from './components/rating-scale';
import { FeedbackForm} from './components/feedback-form';
import { ThankYouCard } from './components/thank-you-card';

function SentimentsWidget({ 
  emojiSVGUrl = null, 
  step1ButtonText = null,
  ratingScreenOptions = {},
  feedbackFormOptions = {},
  finalThankYouCard = {},
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { animatableContainer: { currentStep } } = state;
  let ComponentToRender = Emoji;
  let props = { emojiSVGUrl };

  switch(currentStep) {
    case ANIMATION_STEP_CLASSES.STEP_1: ComponentToRender = HelpUsImprove; props = { text: step1ButtonText }; break;
    case ANIMATION_STEP_CLASSES.STEP_2: ComponentToRender = RatingScale; props = { ...ratingScreenOptions }; break;
    case ANIMATION_STEP_CLASSES.STEP_3: ComponentToRender = FeedbackForm; props = { ...feedbackFormOptions }; break;
    case ANIMATION_STEP_CLASSES.STEP_4: ComponentToRender = ThankYouCard; props = { ...finalThankYouCard }; break;

    default: ComponentToRender = Emoji;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppWrapper>
        <AnimatableContainer currentStep={currentStep}>          
            {
              React.createElement(ComponentToRender, { ...props })
            }
        </AnimatableContainer>
      </AppWrapper>
    </AppContext.Provider>    
  );
}

SentimentsWidget.propTypes = {
  emojiSVGUrl: PropTypes.string,
  step1ButtonText: PropTypes.string,
  ratingScreenOptions: PropTypes.shape({ 
    maximumRating: PropTypes.number,
    messageTextAfterRating: PropTypes.string,
    showMessageAfterRating: PropTypes.bool,
    heading: PropTypes.string,
    ratingLowText: PropTypes.string,
    ratingHighText: PropTypes.string
   }),
  feedbackFormOptions: PropTypes.shape({ 
    formHeadingText: PropTypes.string,
    questionExperience: PropTypes.string,
    placeholderExperience: PropTypes.string,
    questionImprovement: PropTypes.string,
    placeholderImprovement: PropTypes.string,
    questionEmail: PropTypes.string,
    placeholderEmail: PropTypes.string,
    sumbitButtonText: PropTypes.string
  }),
  finalThankYouCard: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    subtitle: PropTypes.string
  })
}

export default SentimentsWidget;
export {
  Emoji,
  RatingScale,
  FeedbackForm
}; // Export Resusables
