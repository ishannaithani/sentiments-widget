import React, { useReducer } from 'react';
import { reducer, initialState } from './reducers/app.reducer';
import { AppContext } from './app.context';
import './App.module.scss';
import { AppWrapper } from './components/layout/wrapper';
import { AnimatableContainer } from './components/layout/animatable-container';
import { ANIMATION_STEP_CLASSES } from './enums';
import { Emoji } from './components/emoji';
import { HelpUsImprove } from './components/help-us-improve';
import { RatingScale } from './components/rating-scale';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { animatableContainer: { currentStep } } = state;
  let ComponentToRender = Emoji;

  switch(currentStep) {
    case ANIMATION_STEP_CLASSES.STEP_1: ComponentToRender = HelpUsImprove; break;
    case ANIMATION_STEP_CLASSES.STEP_2: ComponentToRender = RatingScale; break;

    default: ComponentToRender = Emoji;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppWrapper>
        <AnimatableContainer currentStep={currentStep}>          
            <ComponentToRender />          
        </AnimatableContainer>
      </AppWrapper>
    </AppContext.Provider>    
  );
}

export default App;
