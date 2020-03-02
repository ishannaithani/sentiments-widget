import React from 'react';
import ReactDOM from 'react-dom';
import SentimentsWidget from './App';
import * as serviceWorker from './serviceWorker';

import emojiSVGUrl from './components/emoji/smile.svg';

/**
 * All possible props for widget configuration. Tweak or uncomment props to see changes.
 */
const widgetProps = {
  emojiSVGUrl,
  step1ButtonText: 'Help Us Improve',
  ratingScreenOptions: {
    maximumRating: 6,
    messageTextAfterRating: 'Thank you! Tell us more.',
    showMessageAfterRating: true,
    heading: 'Rate your experience'
    // ratingLowText: 'Not Satisfied',
    // ratingHighText: 'Very Satisfied'
  },
  feedbackFormOptions: {
    formHeadingText: "Tell us more"
    // questionExperience: string,
    // placeholderExperience: string,
    // questionImprovement: string,
    // placeholderImprovement: string,
    // questionEmail: string,
    // placeholderEmail: string,
    // sumbitButtonText: string
  },
  finalThankYouCard: {
    heading: "Thank you!"
    // subtitle: PropTypes.string
  }
  
};

ReactDOM.render(
  <SentimentsWidget { ...widgetProps } />, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
