import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnimatableContainer } from './index';
import { AppContext } from '../../../app.context';
import { ANIMATION_STEP_CLASSES }  from '../../../enums';
import { ACTION_TYPES }  from '../../../actions/app.actions';

let mockProvider = null;
beforeEach(() => {
 mockProvider = {
    state: 'MOCK_VALUE',
    dispatch: jest.fn()
  }
})

afterEach(() => {
  mockProvider = null
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContext.Provider value={mockProvider}><AnimatableContainer /></AppContext.Provider>, div);
});

it('checks default animation state is set correctly', () => {
 const { getByTestId } = render(<AppContext.Provider value={mockProvider}><AnimatableContainer /></AppContext.Provider>);
 const root = getByTestId('animatable-container-root');
 expect(root).toHaveClass(ANIMATION_STEP_CLASSES.DEFAULT);
});

it('Triggers mouseenter if mocked dispatch is called with correct step class', () => {
  const { getByTestId } = render(<AppContext.Provider value={mockProvider}><AnimatableContainer /></AppContext.Provider>);
  const root = getByTestId('animatable-container-root');
  expect(root).toHaveClass(ANIMATION_STEP_CLASSES.DEFAULT);
  fireEvent.mouseEnter(root);
  expect(mockProvider.dispatch.mock.calls.length).toBe(1);
  expect(mockProvider.dispatch.mock.calls[0][0]).toStrictEqual({ type: ACTION_TYPES.UPDATE_ANIMATION_STEP, payload: ANIMATION_STEP_CLASSES.STEP_1 });
 });
