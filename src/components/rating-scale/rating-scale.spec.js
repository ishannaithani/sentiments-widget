import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { RatingScale } from './index';
import { AppContext } from '../../app.context';

const mockProvider = {
  state: 'MOCK_VALUE',
  dispatch: jest.mock()
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContext.Provider value={{...mockProvider }}><RatingScale /></AppContext.Provider>, div);
});

it('renders with defaultProp of heading', () => {
  const { getByTestId  } = render(<AppContext.Provider value={{...mockProvider }}><RatingScale /></AppContext.Provider>);
  expect(getByTestId('heading')).toHaveTextContent('Rate your experience');
});

it('renders with provided prop of heading', () => {
  const { getByTestId  } = render(<AppContext.Provider value={{...mockProvider }}><RatingScale heading="TEST HEADING" /></AppContext.Provider>);
  expect(getByTestId('heading')).toHaveTextContent('TEST HEADING');
});

it('renders child component <ScaleSelector> ', () => {
  const { getByTestId  } = render(<AppContext.Provider value={{...mockProvider }}><RatingScale /></AppContext.Provider>);
  expect(getByTestId('scale-selector-ul')).toBeInTheDocument();
});

it('renders correct number of ratings when defaultProp', () => {
  const { getByTestId  } = render(<AppContext.Provider value={{...mockProvider }}><RatingScale maximumRating={10} /></AppContext.Provider>);
  const LIElementFirst = getByTestId('rating-li-elem-1');
  const LIElementLast = getByTestId('rating-li-elem-10');
  expect(getByTestId('scale-selector-ul')).toContainElement(LIElementFirst);
  expect(getByTestId('scale-selector-ul')).toContainElement(LIElementLast);
});

it('renders thank you card after clicking rating button', async () => {
  const { getByTestId  } = render(<AppContext.Provider value={{...mockProvider }}><RatingScale maximumRating={10} /></AppContext.Provider>);
  const RateFivePoints = getByTestId('rating-button-5');
  fireEvent.click(RateFivePoints);
  const card = await getByTestId('message-text-after-rating');
  expect(card).toBeInTheDocument();
  expect(card).toHaveTextContent('Thank you! Tell us more.');
});

it('does not render thank you card when prop passed as false', async () => {
  const { getByTestId, queryByTestId  } = render(<AppContext.Provider value={{...mockProvider }}><RatingScale maximumRating={5} showMessageAfterRating={false} /></AppContext.Provider>);
  const RateThreePoints = getByTestId('rating-button-3');
  fireEvent.click(RateThreePoints);
  const card = await queryByTestId('message-text-after-rating');
  expect(card).not.toBeInTheDocument();
});