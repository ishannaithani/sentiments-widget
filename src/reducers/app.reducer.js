import { ACTION_TYPES } from "../actions/app.actions";
import { ANIMATION_STEP_CLASSES } from '../enums';

export const initialState = {
  animatableContainer: {
    currentStep: ANIMATION_STEP_CLASSES.STEP_2
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_ANIMATION_STEP: {
      const newStepClass = action.payload;
      const updatedState = Object.assign({}, state);
      
      updatedState.animatableContainer.currentStep = newStepClass;
      return updatedState;
    }

    default: return initialState;
  }
};