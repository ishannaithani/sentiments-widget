import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThankYouCard } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThankYouCard />, div);
});

it('renders component with heading and subtitle with defaultProps', () => {
  const { getByTestId  } = render(<ThankYouCard />);
  expect(getByTestId('heading')).toHaveTextContent('Thank you!');
  expect(getByTestId('subtitle')).toHaveTextContent('Your feedback is valuable to us.');
});

it('renders component with heading and subtitle passed in props', () => {
  const TEST_HEADING = "TEST_HEADING";
  const TEST_SUBTITLE = "TEST_SUBTITLE";
  const { getByTestId  } = render(<ThankYouCard heading={TEST_HEADING} subtitle={TEST_SUBTITLE} />);
  expect(getByTestId('heading')).toHaveTextContent(TEST_HEADING);
  expect(getByTestId('subtitle')).toHaveTextContent(TEST_SUBTITLE);
});