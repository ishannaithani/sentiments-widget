import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FeedbackForm } from './index';
import { AppContext } from '../../app.context';
import { ANIMATION_STEP_CLASSES }  from '../../enums';
import { ACTION_TYPES }  from '../../actions/app.actions';

const mockProvider = {
  state: 'MOCK_VALUE',
  dispatch: jest.fn()
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContext.Provider value={mockProvider}><FeedbackForm /></AppContext.Provider>, div);
});

it('renders component with default questions, heading, and button text via defaultProps', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><FeedbackForm /></AppContext.Provider>);
  
  expect(getByTestId('question-experience-label')).toHaveTextContent('What did you like the most?');
  expect(getByTestId('question-experience-textarea')).toHaveAttribute('placeholder', 'Tell us your experience (optional)');

  expect(getByTestId('improve-experience-label')).toHaveTextContent('What did you like the least?');
  expect(getByTestId('improve-experience-textarea')).toHaveAttribute('placeholder', 'Let us know how we can improve (optional)');

  expect(getByTestId('email-input-label')).toHaveTextContent('Your email');
  expect(getByTestId('email-input')).toHaveAttribute('placeholder', 'Your email address (optional)');

  expect(getByTestId('form-heading')).toHaveTextContent('Tell us more');
  expect(getByTestId('submit-button')).toHaveTextContent('Submit');
  
});

it('checks correct prop feeds into correct element', () => {
  const dummyFormHeading = "DUMMY FORM HEADING";
  const dummyExpQuestion = "DUMMY CONTENT 1";
  const dummyPlaceholderExp = "DUMMY CONTENT 2";
  const dummImpQuestion = "DUMMY CONTENT 3";
  const dummyPlaceholderImp = "DUMMY CONTENT 4";
  const dummyEmailQuestion = "DUMMY CONTENT 5";
  const dummyPlaceholderEmail = "DUMMY CONTENT 6";
  const dummySubmitButton = "SUMBIT BUTTON DUMMY";


  const { getByTestId  } = render(
    <AppContext.Provider value={mockProvider}>
      <FeedbackForm 
        formHeadingText={dummyFormHeading}
        questionExperience={dummyExpQuestion}
        placeholderExperience={dummyPlaceholderExp}
        questionImprovement={dummImpQuestion}
        placeholderImprovement={dummyPlaceholderImp}
        questionEmail={dummyEmailQuestion}
        placeholderEmail={dummyPlaceholderEmail}
        sumbitButtonText={dummySubmitButton}
      />
    </AppContext.Provider>
  );
  
  expect(getByTestId('question-experience-label')).toHaveTextContent(dummyExpQuestion);
  expect(getByTestId('question-experience-textarea')).toHaveAttribute('placeholder', dummyPlaceholderExp);

  expect(getByTestId('improve-experience-label')).toHaveTextContent(dummImpQuestion);
  expect(getByTestId('improve-experience-textarea')).toHaveAttribute('placeholder', dummyPlaceholderImp);

  expect(getByTestId('email-input-label')).toHaveTextContent(dummyEmailQuestion);
  expect(getByTestId('email-input')).toHaveAttribute('placeholder', dummyPlaceholderEmail);

  expect(getByTestId('form-heading')).toHaveTextContent(dummyFormHeading);
  expect(getByTestId('submit-button')).toHaveTextContent(dummySubmitButton);
  
});

it('populates input text and textareas with values', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><FeedbackForm /></AppContext.Provider>);
  const inputExpQuestion = getByTestId('question-experience-textarea');
  const inputImpQuestion = getByTestId('improve-experience-textarea');
  const inputEmailQuestion = getByTestId('email-input');

  const dummExp = "dummy text experience";
  const dummImp = "dummy text improvement";
  const dummEmail = "dummyemail@dummy.com";
  
  fireEvent.change(inputExpQuestion, { target: { value: dummExp } });
  fireEvent.change(inputImpQuestion, { target: { value: dummImp } });
  fireEvent.change(inputEmailQuestion, { target: { value: dummEmail } });

  expect(inputExpQuestion.value).toBe(dummExp);
  expect(inputImpQuestion.value).toBe(dummImp);
  expect(inputEmailQuestion.value).toBe(dummEmail);  
});

it('checkes the state of submit button when all inputs are empty', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><FeedbackForm /></AppContext.Provider>);
  const button = getByTestId('submit-button');
  
  expect(button).toHaveAttribute('disabled');  
});

it('checkes the state of submit button when atleast one input is populated', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><FeedbackForm /></AppContext.Provider>);
  const button = getByTestId('submit-button');
  const inputExpQuestion = getByTestId('question-experience-textarea');

  fireEvent.change(inputExpQuestion, { target: { value: 'test' } });
  
  expect(button).not.toHaveAttribute('disabled');  
});


it('updates app state to next step on button click', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><FeedbackForm /></AppContext.Provider>);
  const button = getByTestId('submit-button');
  const inputExpQuestion = getByTestId('question-experience-textarea');

  fireEvent.change(inputExpQuestion, { target: { value: 'test' } });
  
  expect(button).not.toHaveAttribute('disabled');  
  fireEvent.click(button);
  expect(mockProvider.dispatch.mock.calls.length).toBe(1);
  expect(mockProvider.dispatch.mock.calls[0][0]).toStrictEqual({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.STEP_4 });
});



