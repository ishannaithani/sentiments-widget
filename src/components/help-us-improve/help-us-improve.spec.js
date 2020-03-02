import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HelpUsImprove } from './index';
import { AppContext } from '../../app.context';
import { ANIMATION_STEP_CLASSES }  from '../../enums';
import { ACTION_TYPES }  from '../../actions/app.actions';

const mockProvider = {
  state: 'MOCK_VALUE',
  dispatch: jest.fn()
}

// mockProvider.dispatch = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContext.Provider value={mockProvider}><HelpUsImprove /></AppContext.Provider>, div);
});

it('renders component with text defaultProp', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><HelpUsImprove /></AppContext.Provider>);
  expect(getByTestId('button-text')).toHaveTextContent('Help us improve');
});

it('renders component with text prop provided', () => {
  const DUMMY_TEXT = "DUMMY TEXT"
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><HelpUsImprove text={DUMMY_TEXT} /></AppContext.Provider>);
  expect(getByTestId('button-text')).toHaveTextContent(DUMMY_TEXT);
});

it('updates app state to next step on button click', () => {
  const { getByTestId  } = render(<AppContext.Provider value={mockProvider}><HelpUsImprove /></AppContext.Provider>);
  const button = getByTestId('button-text');
  fireEvent.click(button);
  expect(mockProvider.dispatch.mock.calls.length).toBe(1);
  expect(mockProvider.dispatch.mock.calls[0][0]).toStrictEqual({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.STEP_2 });
});

